import axios, { AxiosInstance } from 'axios';
import { prisma } from '../config/database';
import { logger } from '../config/logger';
import { slugify } from '../utils/helpers';

interface CJProduct {
  id: string;
  nameEn: string;
  sku: string;
  sellPrice: string;
  bigImage: string;
  warehouseInventoryNum: number;
  categoryId?: string;
  threeCategoryName?: string;
}

interface CJAuthResponse {
  code: number;
  result: boolean;
  data: {
    accessToken: string;
    accessTokenExpiryDate: string;
    refreshToken: string;
    refreshTokenExpiryDate: string;
  };
}

interface CJProductListResponse {
  code: number;
  result: boolean;
  data: {
    pageSize: number;
    pageNumber: number;
    totalRecords: number;
    content: Array<{
      productList: CJProduct[];
    }>;
  };
}

export class CJDropshippingService {
  private baseUrl = 'https://developers.cjdropshipping.com/api2.0/v1';
  private apiKey: string;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;
  private axiosInstance: AxiosInstance;

  // Taxa de conversão USD para BRL (atualizar periodicamente)
  private USD_TO_BRL = 5.0;
  // Margem de lucro padrão (100% = dobra o preço)
  private PROFIT_MARGIN = 2.5;

  constructor() {
    this.apiKey = process.env.CJ_API_KEY || '';
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
    });
  }

  /**
   * Obtém o Access Token da CJ Dropshipping
   */
  async getAccessToken(): Promise<string> {
    // Se já temos um token válido, retorna ele
    if (this.accessToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await this.axiosInstance.post<CJAuthResponse>(
        '/authentication/getAccessToken',
        { apiKey: this.apiKey }
      );

      if (response.data.result && response.data.data) {
        this.accessToken = response.data.data.accessToken;
        this.tokenExpiry = new Date(response.data.data.accessTokenExpiryDate);
        logger.info('CJ Dropshipping: Token obtido com sucesso');
        return this.accessToken;
      }

      throw new Error('Falha ao obter token da CJ Dropshipping');
    } catch (error: any) {
      logger.error('CJ Dropshipping: Erro ao obter token', error.message);
      throw error;
    }
  }

  /**
   * Busca produtos na CJ Dropshipping
   */
  async searchProducts(keyword: string, page = 1, size = 20): Promise<CJProduct[]> {
    const token = await this.getAccessToken();

    try {
      const response = await this.axiosInstance.get<CJProductListResponse>(
        '/product/listV2',
        {
          headers: { 'CJ-Access-Token': token },
          params: { keyWord: keyword, page, size },
        }
      );

      if (response.data.result && response.data.data) {
        const products: CJProduct[] = [];
        for (const item of response.data.data.content) {
          products.push(...item.productList);
        }
        return products;
      }

      return [];
    } catch (error: any) {
      logger.error('CJ Dropshipping: Erro ao buscar produtos', error.message);
      throw error;
    }
  }

  /**
   * Converte preço USD para BRL com margem de lucro
   */
  convertPrice(usdPrice: string | number): number {
    const price = typeof usdPrice === 'string' 
      ? parseFloat(usdPrice.split(' -- ')[0]) 
      : usdPrice;
    
    // Preço em BRL com margem de lucro
    const brlPrice = price * this.USD_TO_BRL * this.PROFIT_MARGIN;
    
    // Arredonda para .90 (ex: 149.90, 299.90)
    return Math.ceil(brlPrice / 10) * 10 - 0.10;
  }

  /**
   * Gera um preço original (com desconto fictício)
   */
  generateOriginalPrice(price: number): number {
    // Adiciona 20-40% ao preço para mostrar "desconto"
    const markup = 1 + (Math.random() * 0.2 + 0.2);
    return Math.ceil((price * markup) / 10) * 10 - 0.10;
  }

  /**
   * Mapeia categoria CJ para categoria do site
   */
  async mapCategory(cjCategoryName: string): Promise<string> {
    const categoryMap: Record<string, string> = {
      'hoodie': 'blusas',
      'sweatshirt': 'blusas',
      't-shirt': 'blusas',
      'cargo': 'calcas',
      'pants': 'calcas',
      'jogger': 'calcas',
      'sneakers': 'tenis',
      'shoes': 'tenis',
    };

    const lowerName = cjCategoryName.toLowerCase();
    
    for (const [key, slug] of Object.entries(categoryMap)) {
      if (lowerName.includes(key)) {
        const category = await prisma.category.findUnique({ where: { slug } });
        if (category) return category.id;
      }
    }

    // Categoria padrão: blusas
    const defaultCategory = await prisma.category.findUnique({ where: { slug: 'blusas' } });
    return defaultCategory?.id || '';
  }

  /**
   * Importa produtos da CJ para o banco de dados
   */
  async importProducts(keywords: string[], productsPerKeyword = 5): Promise<number> {
    let importedCount = 0;

    // Primeiro, criar ou obter o fornecedor CJ Dropshipping
    let supplier = await prisma.supplier.findFirst({
      where: { name: 'CJ Dropshipping' },
    });

    if (!supplier) {
      supplier = await prisma.supplier.create({
        data: {
          name: 'CJ Dropshipping',
          website: 'https://cjdropshipping.com',
          apiUrl: this.baseUrl,
          apiKey: this.apiKey,
          isActive: true,
        },
      });
    }

    for (const keyword of keywords) {
      try {
        logger.info(`CJ Dropshipping: Buscando produtos para "${keyword}"`);
        const products = await this.searchProducts(keyword, 1, productsPerKeyword);

        for (const cjProduct of products) {
          try {
            // Verificar se produto já existe pelo SKU
            const existingVariant = await prisma.productVariant.findUnique({
              where: { sku: cjProduct.sku },
            });

            if (existingVariant) {
              logger.debug(`Produto ${cjProduct.sku} já existe, pulando...`);
              continue;
            }

            // Mapear categoria
            const categoryId = await this.mapCategory(keyword);
            if (!categoryId) {
              logger.warn(`Categoria não encontrada para: ${keyword}`);
              continue;
            }

            // Calcular preços
            const price = this.convertPrice(cjProduct.sellPrice);
            const originalPrice = this.generateOriginalPrice(price);

            // Gerar slug único
            const baseSlug = slugify(cjProduct.nameEn);
            let slug = baseSlug;
            let counter = 1;
            
            while (await prisma.product.findUnique({ where: { slug } })) {
              slug = `${baseSlug}-${counter}`;
              counter++;
            }

            // Criar produto
            const product = await prisma.product.create({
              data: {
                name: this.translateProductName(cjProduct.nameEn),
                slug,
                description: this.generateDescription(cjProduct.nameEn, keyword),
                story: this.generateStory(keyword),
                price,
                originalPrice,
                categoryId,
                supplierId: supplier.id,
                rating: 4.5 + Math.random() * 0.5,
                reviewCount: Math.floor(Math.random() * 200) + 50,
                isNew: Math.random() > 0.5,
                isBestSeller: Math.random() > 0.7,
                isActive: true,
                images: {
                  create: [{
                    url: cjProduct.bigImage,
                    alt: cjProduct.nameEn,
                    order: 0,
                  }],
                },
                variants: {
                  create: this.generateVariants(cjProduct),
                },
                tags: {
                  create: this.generateTags(keyword),
                },
              },
            });

            importedCount++;
            logger.info(`Produto importado: ${product.name} (${product.slug})`);

            // Delay para não exceder rate limit da API
            await new Promise(resolve => setTimeout(resolve, 1100));

          } catch (productError: any) {
            logger.error(`Erro ao importar produto ${cjProduct.sku}:`, productError.message);
          }
        }
      } catch (error: any) {
        logger.error(`Erro ao buscar produtos para "${keyword}":`, error.message);
      }
    }

    logger.info(`CJ Dropshipping: ${importedCount} produtos importados`);
    return importedCount;
  }

  /**
   * Traduz nome do produto para português
   */
  private translateProductName(name: string): string {
    const translations: Record<string, string> = {
      'hoodie': 'Moletom',
      'sweatshirt': 'Moletom',
      't-shirt': 'Camiseta',
      'cargo pants': 'Calça Cargo',
      'jogger': 'Calça Jogger',
      'pants': 'Calça',
      'sneakers': 'Tênis',
      'oversized': 'Oversized',
      'streetwear': 'Streetwear',
      'hip hop': 'Hip Hop',
      'men': 'Masculino',
      'women': 'Feminino',
      'loose': 'Solto',
      'pullover': 'Pullover',
    };

    let translated = name;
    for (const [en, pt] of Object.entries(translations)) {
      const regex = new RegExp(en, 'gi');
      translated = translated.replace(regex, pt);
    }

    return translated;
  }

  /**
   * Gera descrição do produto
   */
  private generateDescription(name: string, category: string): string {
    const descriptions: Record<string, string> = {
      'hoodie': 'Moletom confortável e estiloso, perfeito para o dia a dia urbano. Tecido de alta qualidade com acabamento premium.',
      'cargo': 'Calça cargo moderna com múltiplos bolsos funcionais. Design urbano que combina estilo e praticidade.',
      'jogger': 'Calça jogger com elástico no tornozelo para um visual moderno. Confortável e versátil para qualquer ocasião.',
      'oversized': 'Peça oversized com caimento perfeito. Tendência streetwear que garante conforto e estilo.',
      'sneakers': 'Tênis urbano com design exclusivo. Sola confortável e materiais de alta qualidade.',
    };

    for (const [key, desc] of Object.entries(descriptions)) {
      if (category.toLowerCase().includes(key) || name.toLowerCase().includes(key)) {
        return desc;
      }
    }

    return 'Peça exclusiva da coleção Vértice. Design moderno e materiais de alta qualidade para quem busca estilo e conforto.';
  }

  /**
   * Gera história/storytelling do produto
   */
  private generateStory(category: string): string {
    const stories: Record<string, string> = {
      'hoodie': 'Inspirado nas ruas de grandes metrópoles, este moletom representa a essência do streetwear contemporâneo. Cada detalhe foi pensado para quem não segue tendências - cria as próprias.',
      'cargo': 'Das passarelas às ruas, a calça cargo se reinventou como símbolo de atitude e funcionalidade. Uma peça que transcende modismos e se torna essencial no guarda-roupa urbano.',
      'jogger': 'O conforto encontra o estilo nesta jogger que nasceu da cultura urbana. Perfeita para quem vive em movimento sem abrir mão da autenticidade.',
      'oversized': 'O oversized é mais que uma tendência - é uma declaração. Liberdade de movimento, expressão pessoal e o conforto que você merece.',
      'sneakers': 'Cada passo conta uma história. Este tênis foi desenvolvido para quem entende que estilo começa de baixo para cima.',
    };

    for (const [key, story] of Object.entries(stories)) {
      if (category.toLowerCase().includes(key)) {
        return story;
      }
    }

    return 'Uma peça que representa a essência da Vértice: autenticidade, qualidade e estilo urbano. Feita para quem faz suas próprias regras.';
  }

  /**
   * Gera variantes do produto (tamanhos e cores)
   */
  private generateVariants(product: CJProduct): Array<{
    size: string;
    colorName: string;
    colorHex: string;
    sku: string;
    stock: number;
  }> {
    const sizes = ['P', 'M', 'G', 'GG'];
    const colors = [
      { name: 'Preto', hex: '#000000' },
      { name: 'Branco', hex: '#FFFFFF' },
      { name: 'Cinza', hex: '#808080' },
    ];

    const variants: Array<{
      size: string;
      colorName: string;
      colorHex: string;
      sku: string;
      stock: number;
    }> = [];

    // Gerar algumas variantes aleatórias
    const numSizes = Math.floor(Math.random() * 2) + 2; // 2-3 tamanhos
    const numColors = Math.floor(Math.random() * 2) + 1; // 1-2 cores

    const selectedSizes = sizes.slice(0, numSizes);
    const selectedColors = colors.slice(0, numColors);

    for (const size of selectedSizes) {
      for (const color of selectedColors) {
        variants.push({
          size,
          colorName: color.name,
          colorHex: color.hex,
          sku: `${product.sku}-${size}-${color.name.substring(0, 2).toUpperCase()}`,
          stock: Math.floor(Math.random() * 50) + 10,
        });
      }
    }

    return variants;
  }

  /**
   * Gera tags do produto
   */
  private generateTags(category: string): Array<{ name: string }> {
    const baseTags = ['Streetwear', 'Urbano', 'Exclusivo'];
    const categoryTags: Record<string, string[]> = {
      'hoodie': ['Moletom', 'Conforto', 'Inverno'],
      'cargo': ['Cargo', 'Funcional', 'Tendência'],
      'jogger': ['Jogger', 'Esportivo', 'Casual'],
      'oversized': ['Oversized', 'Tendência', 'Conforto'],
      'sneakers': ['Tênis', 'Calçado', 'Performance'],
    };

    const tags = [...baseTags];
    
    for (const [key, catTags] of Object.entries(categoryTags)) {
      if (category.toLowerCase().includes(key)) {
        tags.push(...catTags.slice(0, 2));
        break;
      }
    }

    return tags.slice(0, 5).map(name => ({ name }));
  }

  /**
   * Cria pedido na CJ Dropshipping
   */
  async createOrder(orderData: {
    products: Array<{
      sku: string;
      quantity: number;
    }>;
    shippingAddress: {
      name: string;
      phone: string;
      country: string;
      province: string;
      city: string;
      address: string;
      zipCode: string;
    };
  }): Promise<any> {
    const token = await this.getAccessToken();

    try {
      const response = await this.axiosInstance.post(
        '/shopping/order/createOrder',
        {
          orderNumber: `VTX-${Date.now()}`,
          shippingCountryCode: 'BR',
          shippingProvince: orderData.shippingAddress.province,
          shippingCity: orderData.shippingAddress.city,
          shippingAddress: orderData.shippingAddress.address,
          shippingCustomerName: orderData.shippingAddress.name,
          shippingZip: orderData.shippingAddress.zipCode,
          shippingPhone: orderData.shippingAddress.phone,
          products: orderData.products.map(p => ({
            vid: p.sku,
            quantity: p.quantity,
          })),
        },
        {
          headers: { 'CJ-Access-Token': token },
        }
      );

      return response.data;
    } catch (error: any) {
      logger.error('CJ Dropshipping: Erro ao criar pedido', error.message);
      throw error;
    }
  }
}

export const cjDropshippingService = new CJDropshippingService();
