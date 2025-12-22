/**
 * Script para importar produtos da CJ Dropshipping
 * 
 * Uso: npx ts-node scripts/import-cj-products.ts
 */

import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

// Configurações
const CJ_API_KEY = process.env.CJ_API_KEY || 'CJ5013914@api@086dfe67b50f4a1ca1ce0255e2557fe1';
const CJ_BASE_URL = 'https://developers.cjdropshipping.com/api2.0/v1';

// Taxa de conversão e margem
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
  const response = await axios.post(`${CJ_BASE_URL}/authentication/getAccessToken`, {
    apiKey: CJ_API_KEY,
  });

  if (response.data.result) {
    return response.data.data.accessToken;
  }

  throw new Error('Falha ao obter token');
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
  return Math.ceil(brlPrice / 10) * 10 - 0.10;
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
    'hoodie': 'Moletom',
    'sweatshirt': 'Moletom',
    't-shirt': 'Camiseta',
    'cargo pants': 'Calça Cargo',
    'jogger': 'Calça Jogger',
    'pants': 'Calça',
    'sneakers': 'Tênis',
    'oversized': 'Oversized',
    'streetwear': 'Streetwear',
  };

  let translated = name;
  for (const [en, pt] of Object.entries(translations)) {
    translated = translated.replace(new RegExp(en, 'gi'), pt);
  }
  return translated;
}

async function main() {
  console.log('🚀 Iniciando importação de produtos da CJ Dropshipping...\n');

  // Obter token
  console.log('🔑 Obtendo Access Token...');
  let token: string;
  try {
    token = await getAccessToken();
    console.log('✅ Token obtido com sucesso!\n');
  } catch (error) {
    console.error('❌ Erro ao obter token. Usando token existente...');
    token = 'API@CJ5013914@CJ:eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzMTMwMiIsInR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJzdWIiOiJicUxvYnFRMGxtTm55UXB4UFdMWnlraGVDbDJhVlliZHR1d0xmUlBqMDNvYVlDcFp5cXRBcCt3RSt4SXVPSmZzMFVNTVJEMjNrY1JUeWJsWDlvekorcGpRQ1plWUcya1AwWlRTeGhKZlp5NWl2ZWVOYk1Xd1hFTlB5bWFVejhWcW4vLzdNQ3krU004bFlrWDdkNlhwdXJBY0UxaE5EMnZGQkU2MGhOY29uV1RBSGtUS0FlUWVNLzYwanR4N2UwY0EwOVpFWml4WmJ2WENtQ3ZFVWsreWJlZHZxWjdlQTlCRDRFM1hTMDRKSitrS05FYXNVRkg0aUpuODdKYWM2ZWZwL2FXcTM4amtUREJOSlA5VVdyK2d6QlhLSXhyUkVEVkx1VFY1aTc5ODBlMzFKUG1nV2d6MDdvYjhFbGtlUGhsUzF0ZXIwQ2phUTJJVlBOK3pkNlcyWHc9PSIsImlhdCI6MTc2NjQxMzQ4Mn0.wsywvEct0PGnH6yIK3rbTmdecp6FPqvPZd2Uy6oSuZU';
  }

  // Criar fornecedor CJ Dropshipping
  console.log('📦 Criando/verificando fornecedor...');
  let supplier = await prisma.supplier.findFirst({
    where: { name: 'CJ Dropshipping' },
  });

  if (!supplier) {
    supplier = await prisma.supplier.create({
      data: {
        name: 'CJ Dropshipping',
        website: 'https://cjdropshipping.com',
        apiUrl: CJ_BASE_URL,
        isActive: true,
      },
    });
    console.log('✅ Fornecedor criado!\n');
  } else {
    console.log('✅ Fornecedor já existe!\n');
  }

  // Buscar categorias existentes
  const categories = await prisma.category.findMany();
  console.log(`📁 Categorias encontradas: ${categories.map(c => c.slug).join(', ')}\n`);

  // Palavras-chave para buscar produtos
  const keywords = [
    { keyword: 'hoodie streetwear', categorySlug: 'blusas' },
    { keyword: 'oversized t-shirt', categorySlug: 'blusas' },
    { keyword: 'cargo pants men', categorySlug: 'calcas' },
    { keyword: 'jogger pants', categorySlug: 'calcas' },
  ];

  let importedCount = 0;

  for (const { keyword, categorySlug } of keywords) {
    console.log(`\n🔍 Buscando: "${keyword}"...`);
    
    const category = categories.find(c => c.slug === categorySlug);
    if (!category) {
      console.log(`⚠️ Categoria "${categorySlug}" não encontrada, pulando...`);
      continue;
    }

    try {
      const products = await searchProducts(token, keyword, 4);
      console.log(`   Encontrados: ${products.length} produtos`);

      for (const cjProduct of products) {
        // Verificar se já existe
        const existingSku = await prisma.productVariant.findFirst({
          where: { sku: { startsWith: cjProduct.sku } },
        });

        if (existingSku) {
          console.log(`   ⏭️ ${cjProduct.nameEn} (já existe)`);
          continue;
        }

        // Gerar slug único
        let slug = slugify(cjProduct.nameEn);
        let counter = 1;
        while (await prisma.product.findUnique({ where: { slug } })) {
          slug = `${slugify(cjProduct.nameEn)}-${counter}`;
          counter++;
        }

        // Calcular preços
        const price = convertPrice(cjProduct.sellPrice);
        const originalPrice = Math.ceil((price * 1.3) / 10) * 10 - 0.10;

        // Criar produto
        const product = await prisma.product.create({
          data: {
            name: translateName(cjProduct.nameEn),
            slug,
            description: `Peça exclusiva da coleção Vértice. Design moderno e materiais de alta qualidade.`,
            story: `Uma peça que representa a essência da Vértice: autenticidade, qualidade e estilo urbano.`,
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
              create: [{
                url: cjProduct.bigImage,
                alt: cjProduct.nameEn,
                order: 0,
              }],
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
              create: [
                { name: 'Streetwear' },
                { name: 'Urbano' },
                { name: 'Exclusivo' },
              ],
            },
          },
        });

        importedCount++;
        console.log(`   ✅ ${product.name} - R$ ${price.toFixed(2)}`);

        // Delay para não exceder rate limit
        await new Promise(resolve => setTimeout(resolve, 1200));
      }
    } catch (error: any) {
      console.log(`   ❌ Erro: ${error.message}`);
    }
  }

  console.log(`\n\n🎉 Importação concluída! ${importedCount} produtos importados.`);
  
  // Mostrar total de produtos
  const totalProducts = await prisma.product.count();
  console.log(`📊 Total de produtos no banco: ${totalProducts}`);

  await prisma.$disconnect();
}

main().catch(console.error);
