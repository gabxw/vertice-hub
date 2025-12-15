import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@vertice.com' },
    update: {},
    create: {
      email: 'admin@vertice.com',
      password: adminPassword,
      name: 'Admin VÉRTICE',
      role: 'ADMIN',
      emailVerified: true,
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create test customer
  const customerPassword = await bcrypt.hash('customer123', 10);
  const customer = await prisma.user.upsert({
    where: { email: 'cliente@teste.com' },
    update: {},
    create: {
      email: 'cliente@teste.com',
      password: customerPassword,
      name: 'Cliente Teste',
      role: 'CUSTOMER',
      emailVerified: true,
    },
  });
  console.log('✅ Customer user created:', customer.email);

  // Create categories
  const categoriesTenis = await prisma.category.upsert({
    where: { slug: 'tenis' },
    update: {},
    create: {
      name: 'Tênis',
      slug: 'tenis',
      description: 'Estilo e conforto para seus pés',
      image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600',
    },
  });

  const categoriesCalcas = await prisma.category.upsert({
    where: { slug: 'calcas' },
    update: {},
    create: {
      name: 'Calças',
      slug: 'calcas',
      description: 'Caimento perfeito, estilo único',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
    },
  });

  const categoriesBlusas = await prisma.category.upsert({
    where: { slug: 'blusas' },
    update: {},
    create: {
      name: 'Blusas',
      slug: 'blusas',
      description: 'Express yourself',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600',
    },
  });
  console.log('✅ Categories created');

  // Create supplier
  const supplier = await prisma.supplier.create({
    data: {
      name: 'Fornecedor Principal',
      email: 'fornecedor@exemplo.com',
      phone: '(11) 98765-4321',
      website: 'https://fornecedor.com',
    },
  });
  console.log('✅ Supplier created');

  // Create products
  const product1 = await prisma.product.create({
    data: {
      name: 'Urban Runner Pro',
      slug: 'urban-runner-pro',
      description: 'O tênis que vai transformar seu estilo urbano',
      story:
        'Criado para quem não aceita o comum. O Urban Runner Pro nasceu das ruas, para as ruas. Cada passo é uma declaração de estilo.',
      price: 289.9,
      originalPrice: 399.9,
      categoryId: categoriesTenis.id,
      supplierId: supplier.id,
      rating: 4.8,
      reviewCount: 234,
      isBestSeller: true,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
            alt: 'Urban Runner Pro - Vista frontal',
            order: 0,
          },
          {
            url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
            alt: 'Urban Runner Pro - Vista lateral',
            order: 1,
          },
          {
            url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
            alt: 'Urban Runner Pro - Detalhe',
            order: 2,
          },
        ],
      },
      benefits: {
        create: [
          { text: 'Conforto extremo durante todo o dia', order: 0 },
          { text: 'Design exclusivo streetwear', order: 1 },
          { text: 'Tecnologia de amortecimento premium', order: 2 },
          { text: 'Combina com qualquer visual', order: 3 },
        ],
      },
      tags: {
        create: [{ name: 'bestseller' }, { name: 'streetwear' }, { name: 'conforto' }],
      },
      variants: {
        create: [
          { size: '38', colorName: 'Preto', colorHex: '#1a1a1a', sku: 'URP-38-BLK', stock: 5 },
          { size: '39', colorName: 'Preto', colorHex: '#1a1a1a', sku: 'URP-39-BLK', stock: 8 },
          { size: '40', colorName: 'Preto', colorHex: '#1a1a1a', sku: 'URP-40-BLK', stock: 12 },
          { size: '41', colorName: 'Preto', colorHex: '#1a1a1a', sku: 'URP-41-BLK', stock: 10 },
          { size: '42', colorName: 'Preto', colorHex: '#1a1a1a', sku: 'URP-42-BLK', stock: 7 },
          { size: '38', colorName: 'Branco', colorHex: '#ffffff', sku: 'URP-38-WHT', stock: 4 },
          { size: '39', colorName: 'Branco', colorHex: '#ffffff', sku: 'URP-39-WHT', stock: 6 },
          { size: '40', colorName: 'Branco', colorHex: '#ffffff', sku: 'URP-40-WHT', stock: 9 },
          { size: '41', colorName: 'Branco', colorHex: '#ffffff', sku: 'URP-41-WHT', stock: 11 },
          { size: '42', colorName: 'Branco', colorHex: '#ffffff', sku: 'URP-42-WHT', stock: 5 },
        ],
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Calça Cargo Essentials',
      slug: 'calca-cargo-essentials',
      description: 'Praticidade e estilo em uma peça só',
      story:
        'A Cargo Essentials foi desenhada para quem vive intensamente. Bolsos funcionais, caimento perfeito, atitude de sobra.',
      price: 189.9,
      originalPrice: 249.9,
      categoryId: categoriesCalcas.id,
      supplierId: supplier.id,
      rating: 4.7,
      reviewCount: 156,
      isBestSeller: true,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
            alt: 'Calça Cargo Essentials',
            order: 0,
          },
          {
            url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800',
            alt: 'Calça Cargo Essentials - Detalhe',
            order: 1,
          },
        ],
      },
      benefits: {
        create: [
          { text: 'Bolsos práticos e funcionais', order: 0 },
          { text: 'Tecido resistente e confortável', order: 1 },
          { text: 'Caimento moderno', order: 2 },
          { text: 'Fácil de combinar', order: 3 },
        ],
      },
      tags: {
        create: [{ name: 'bestseller' }, { name: 'casual' }],
      },
      variants: {
        create: [
          { size: '36', colorName: 'Preto', colorHex: '#1a1a1a', sku: 'CCE-36-BLK', stock: 15 },
          { size: '38', colorName: 'Preto', colorHex: '#1a1a1a', sku: 'CCE-38-BLK', stock: 20 },
          { size: '40', colorName: 'Preto', colorHex: '#1a1a1a', sku: 'CCE-40-BLK', stock: 23 },
          { size: '42', colorName: 'Preto', colorHex: '#1a1a1a', sku: 'CCE-42-BLK', stock: 18 },
          { size: '36', colorName: 'Caqui', colorHex: '#c4a35a', sku: 'CCE-36-KHK', stock: 12 },
          { size: '38', colorName: 'Caqui', colorHex: '#c4a35a', sku: 'CCE-38-KHK', stock: 16 },
          { size: '40', colorName: 'Caqui', colorHex: '#c4a35a', sku: 'CCE-40-KHK', stock: 19 },
        ],
      },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Oversized Statement Tee',
      slug: 'oversized-statement-tee',
      description: 'Faça sua declaração de estilo',
      story:
        'Uma camiseta não é só uma camiseta. É uma extensão de quem você é. A Statement Tee é para quem quer ser visto.',
      price: 129.9,
      originalPrice: 179.9,
      categoryId: categoriesBlusas.id,
      supplierId: supplier.id,
      rating: 4.9,
      reviewCount: 312,
      isBestSeller: true,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
            alt: 'Oversized Statement Tee',
            order: 0,
          },
          {
            url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
            alt: 'Oversized Statement Tee - Detalhe',
            order: 1,
          },
        ],
      },
      benefits: {
        create: [
          { text: 'Algodão premium 100%', order: 0 },
          { text: 'Corte oversized moderno', order: 1 },
          { text: 'Estampa exclusiva', order: 2 },
          { text: 'Durável e confortável', order: 3 },
        ],
      },
      tags: {
        create: [{ name: 'bestseller' }, { name: 'streetwear' }],
      },
      variants: {
        create: [
          { size: 'P', colorName: 'Preto', colorHex: '#1a1a1a', sku: 'OST-P-BLK', stock: 25 },
          { size: 'M', colorName: 'Preto', colorHex: '#1a1a1a', sku: 'OST-M-BLK', stock: 34 },
          { size: 'G', colorName: 'Preto', colorHex: '#1a1a1a', sku: 'OST-G-BLK', stock: 30 },
          { size: 'GG', colorName: 'Preto', colorHex: '#1a1a1a', sku: 'OST-GG-BLK', stock: 22 },
          { size: 'P', colorName: 'Branco', colorHex: '#ffffff', sku: 'OST-P-WHT', stock: 28 },
          { size: 'M', colorName: 'Branco', colorHex: '#ffffff', sku: 'OST-M-WHT', stock: 35 },
          { size: 'G', colorName: 'Branco', colorHex: '#ffffff', sku: 'OST-G-WHT', stock: 31 },
        ],
      },
    },
  });

  console.log('✅ Products created');

  // Create coupons
  const coupon1 = await prisma.coupon.create({
    data: {
      code: 'BEMVINDO10',
      description: 'Cupom de boas-vindas - 10% de desconto',
      type: 'PERCENTAGE',
      value: 10,
      minPurchase: 100,
      maxDiscount: 50,
      usageLimit: 1000,
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2025-12-31'),
      isActive: true,
    },
  });

  const coupon2 = await prisma.coupon.create({
    data: {
      code: 'FRETEGRATIS',
      description: 'Frete grátis para compras acima de R$ 200',
      type: 'FIXED',
      value: 0,
      minPurchase: 200,
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2025-12-31'),
      isActive: true,
    },
  });

  console.log('✅ Coupons created');

  // Create sample reviews
  await prisma.review.create({
    data: {
      productId: product1.id,
      userId: customer.id,
      rating: 5,
      content:
        'Melhor tênis que já comprei! O conforto é surreal e o design é único. Recebo elogios toda vez que uso.',
      verified: true,
      isApproved: true,
    },
  });

  await prisma.review.create({
    data: {
      productId: product3.id,
      userId: customer.id,
      rating: 5,
      content: 'Camiseta perfeita! Tecido de qualidade e o caimento oversized ficou incrível.',
      verified: true,
      isApproved: true,
    },
  });

  console.log('✅ Reviews created');

  console.log('');
  console.log('🎉 Database seeded successfully!');
  console.log('');
  console.log('📝 Login credentials:');
  console.log('   Admin: admin@vertice.com / admin123');
  console.log('   Customer: cliente@teste.com / customer123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
