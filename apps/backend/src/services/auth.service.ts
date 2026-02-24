import { prisma } from '../config/database';
import { hashPassword, comparePassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { generateRandomToken } from '../utils/helpers';
import { logger } from '../config/logger';
import { addDays, addHours } from 'date-fns';
import type { RegisterInput, LoginInput } from '../validators/auth.validator';

export class AuthService {
  /**
   * Register new user
   */
  async register(data: RegisterInput) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    // Check CPF if provided
    if (data.cpf) {
      const existingCPF = await prisma.user.findUnique({
        where: { cpf: data.cpf },
      });

      if (existingCPF) {
        throw new Error('CPF já cadastrado');
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        cpf: data.cpf,
        phone: data.phone,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    logger.info(`New user registered: ${user.email}`);

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Save refresh token
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: addDays(new Date(), 7),
      },
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  /**
   * Login user
   */
  async login(data: LoginInput) {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('Email ou senha inválidos');
    }

    // Verify password
    const isValidPassword = await comparePassword(data.password, user.password);

    if (!isValidPassword) {
      throw new Error('Email ou senha inválidos');
    }

    logger.info(`User logged in: ${user.email}`);

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Save refresh token
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: addDays(new Date(), 7),
      },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Refresh access token
   */
  async refreshAccessToken(token: string) {
    // Verify refresh token
    const payload = verifyRefreshToken(token);

    // Check if token exists in database
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!storedToken) {
      throw new Error('Refresh token inválido');
    }

    if (storedToken.expiresAt < new Date()) {
      await prisma.refreshToken.delete({ where: { token } });
      throw new Error('Refresh token expirado');
    }

    // Generate new access token
    const accessToken = generateAccessToken({
      userId: storedToken.user.id,
      email: storedToken.user.email,
      role: storedToken.user.role,
    });

    return {
      accessToken,
    };
  }

  /**
   * Logout user
   */
  async logout(token: string) {
    await prisma.refreshToken.deleteMany({
      where: { token },
    });

    logger.info('User logged out');
  }

  /**
   * Request password reset
   */
  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists
      logger.warn(`Password reset requested for non-existent email: ${email}`);
      return;
    }

    // Generate reset token
    const resetToken = generateRandomToken();

    // Save reset token
    await prisma.passwordReset.create({
      data: {
        email: user.email,
        token: resetToken,
        expiresAt: addHours(new Date(), 1), // 1 hour expiration
      },
    });

    logger.info(`Password reset requested for: ${user.email}`);

    // TODO: Send email with reset link
    // await emailService.sendPasswordResetEmail(user.email, resetToken);

    return {
      message: 'Se o email existir, você receberá um link para redefinir sua senha',
    };
  }

  /**
   * Reset password
   */
  async resetPassword(token: string, newPassword: string) {
    // Find reset token
    const resetToken = await prisma.passwordReset.findUnique({
      where: { token },
    });

    if (!resetToken) {
      throw new Error('Token inválido');
    }

    if (resetToken.used) {
      throw new Error('Token já utilizado');
    }

    if (resetToken.expiresAt < new Date()) {
      throw new Error('Token expirado');
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user password
    await prisma.user.update({
      where: { email: resetToken.email },
      data: { password: hashedPassword },
    });

    // Mark token as used
    await prisma.passwordReset.update({
      where: { token },
      data: { used: true },
    });

    // Delete all refresh tokens for this user
    await prisma.refreshToken.deleteMany({
      where: {
        user: {
          email: resetToken.email,
        },
      },
    });

    logger.info(`Password reset for: ${resetToken.email}`);

    return {
      message: 'Senha redefinida com sucesso',
    };
  }
}

export const authService = new AuthService();
