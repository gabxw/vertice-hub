/**
 * Script para importar produtos da CJ Dropshipping
 *
 * Uso:
 * 1) Defina CJ_API_KEY no ambiente
 * 2) Rode: npx ts-node scripts/import-cj-products.ts
 */

import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

const CJ_API_KEY = process.env.CJ_API_KEY;
const CJ_BASE_URL = 'https://developers.cjdropshipping.com/api2.0/v1';

const USD_TO_BRL = 5.0;
const PROFIT_MARGIN = 2.5;

interface CJProduct {
  id: string;
  nameEn: string;
  sku: string;
  sellPrice: string;
  bigImage: string;
  warehouseInventoryNum: number;
}

async function getAccessToken(): Promise<string> {
  if (!CJ_API_KEY) {
    throw new Error('CJ_API_KEY nao definido. Configure a variavel de ambiente antes de executar o script.');
  }

  const response = await axios.post(`${CJ_BASE_URL}/authentication/getAccessToken`, {
    apiKey: CJ_API_KEY,
  });

  if (response.data.result) {
    return response.data.data.accessToken;
  }

  throw new Error('Falha ao obter token da CJ Dropshipping');
}

async function searchProducts(token: string, keyword: string, size = 5): Promise<CJProduct[]> {
  const response = await axios.get(`${CJ_BASE_URL}/product/listV2`, {
    headers: { 'CJ-Access-Token': token },
    params: { keyWord: keyword, page: 1, size },
  });

  if (response.data.result && response.data.data) {
    const products: CJProduct[] = [];
    for (const item of response.data.data.content) {
      products.push(...item.productList);
    }
    return products;
  }

  return [];
}

function convertPrice(usdPrice: string): number {
  const price = parseFloat(usdPrice.split(' -- ')[0]);
  const brlPrice = price * USD_TO_BRL * PROFIT_MARGIN;
  return Math.ceil(brlPrice / 10) * 10 - 0.1;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function translateName(name: string): string {
  const translations: Record<string, string> = {
    hoodie: 'Moletom',
    sweatshirt: 'Moletom',
    't-shirt': 'Camiseta',
    'cargo pants': 'Calca Cargo',
    jogger: 'Calca Jogger',
    pants: 'Calca',
    sneakers: 'Tenis',
    oversized: 'Oversized',
    streetwear: 'Streetwear',
  };

  let translated = name;
  for (const [en, pt] of Object.entries(translations)) {
    translated = translated.replace(new RegExp(en, 'gi'), pt);
  }
  return translated;
}

async function main() {
  console.log('Iniciando importacao de produtos da CJ Dropshipping...\n');

  console.log('Obtendo access token...');
  const token = await getAccessToken();
  console.log('Token obtido com sucesso.\n');

  console.log('Criando/verificando fornecedor...');
  let supplier = await prisma.supplier.findFirst({ where: { name: 'CJ Dropshipping' } });

  if (!supplier) {
    supplier = await prisma.supplier.create({
      data: {
        name: 'CJ Dropshipping',
        website: 'https://cjdropshipping.com',
        apiUrl: CJ_BASE_URL,
        isActive: true,
      },
    });
    console.log('Fornecedor criado.\n');
  } else {
    console.log('Fornecedor ja existe.\n');
  }

  const categories = await prisma.category.findMany();
  console.log(`Categorias encontradas: ${categories.map((c) => c.slug).join(', ')}\n`);

  const keywords = [
    { keyword: 'hoodie streetwear', categorySlug: 'blusas' },
    { keyword: 'oversized t-shirt', categorySlug: 'blusas' },
    { keyword: 'cargo pants men', categorySlug: 'calcas' },
    { keyword: 'jogger pants', categorySlug: 'calcas' },
  ];

  let importedCount = 0;

  for (const { keyword, categorySlug } of keywords) {
    console.log(`\nBuscando: "${keyword}"...`);

    const category = categories.find((c) => c.slug === categorySlug);
    if (!category) {
      console.log(`Categoria "${categorySlug}" nao encontrada, pulando...`);
      continue;
    }

    try {
      const products = await searchProducts(token, keyword, 4);
      console.log(`Encontrados: ${products.length} produtos`);

      for (const cjProduct of products) {
        const existingSku = await prisma.productVariant.findFirst({
          where: { sku: { startsWith: cjProduct.sku } },
        });

        if (existingSku) {
          console.log(`  ${cjProduct.nameEn} (ja existe)`);
          continue;
        }

        let slug = slugify(cjProduct.nameEn);
        let counter = 1;
        while (await prisma.product.findUnique({ where: { slug } })) {
          slug = `${slugify(cjProduct.nameEn)}-${counter}`;
          counter += 1;
        }

        const price = convertPrice(cjProduct.sellPrice);
        const originalPrice = Math.ceil((price * 1.3) / 10) * 10 - 0.1;

        const product = await prisma.product.create({
          data: {
            name: translateName(cjProduct.nameEn),
            slug,
            description: 'Peca exclusiva da colecao Vertice. Design moderno e materiais de alta qualidade.',
            story: 'Uma peca que representa a essencia da Vertice: autenticidade, qualidade e estilo urbano.',
            price,
            originalPrice,
            categoryId: category.id,
            supplierId: supplier.id,
            rating: 4.5 + Math.random() * 0.5,
            reviewCount: Math.floor(Math.random() * 150) + 30,
            isNew: Math.random() > 0.5,
            isBestSeller: Math.random() > 0.7,
            isActive: true,
            images: {
              create: [
                {
                  url: cjProduct.bigImage,
                  alt: cjProduct.nameEn,
                  order: 0,
                },
              ],
            },
            variants: {
              create: [
                { size: 'P', colorName: 'Preto', colorHex: '#000000', sku: `${cjProduct.sku}-P-PR`, stock: 25 },
                { size: 'M', colorName: 'Preto', colorHex: '#000000', sku: `${cjProduct.sku}-M-PR`, stock: 30 },
                { size: 'G', colorName: 'Preto', colorHex: '#000000', sku: `${cjProduct.sku}-G-PR`, stock: 20 },
                { size: 'M', colorName: 'Branco', colorHex: '#FFFFFF', sku: `${cjProduct.sku}-M-BR`, stock: 15 },
              ],
            },
            tags: {
              create: [{ name: 'Streetwear' }, { name: 'Urbano' }, { name: 'Exclusivo' }],
            },
          },
        });

        importedCount += 1;
        console.log(`  ${product.name} - R$ ${price.toFixed(2)}`);

        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
    } catch (error: any) {
      console.log(`Erro: ${error.message}`);
    }
  }

  console.log(`\nImportacao concluida. ${importedCount} produtos importados.`);
  const totalProducts = await prisma.product.count();
  console.log(`Total de produtos no banco: ${totalProducts}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
