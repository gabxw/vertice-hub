import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface NewProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  story: string;
  benefits: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  rating: number;
  reviews: number;
  tags: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

// Mapeamento de categorias
const categoryMap: Record<string, string> = {
  'tenis': 'cat-1',
  'calcas': 'cat-2',
  'blusas': 'cat-3',
  'acessorios': 'cat-4', // Precisará ser criada
};

async function importProducts() {
  try {
    console.log('🚀 Iniciando importação de produtos...\n');

    // Ler arquivo JSON com novos produtos
    const productsPath = path.join(__dirname, '../../../NEW_PRODUCTS.json');
    const productsData = fs.readFileSync(productsPath, 'utf-8');
    const newProducts: NewProduct[] = JSON.parse(productsData);

    console.log(`📦 ${newProducts.length} produtos encontrados no arquivo\n`);

    // Verificar/criar categoria de acessórios
    let acessoriosCategory = await prisma.category.findFirst({
      where: { slug: 'acessorios' },
    });

    if (!acessoriosCategory) {
      console.log('📁 Criando categoria de Acessórios...');
      acessoriosCategory = await prisma.category.create({
        data: {
          id: 'cat-4',
          name: 'Acessórios',
          slug: 'acessorios',
          description: 'Complete seu look com atitude',
          image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600',
          isActive: true,
        },
      });
      console.log('✅ Categoria de Acessórios criada!\n');
    }

    // Importar cada produto
    for (const product of newProducts) {
      console.log(`\n📝 Importando: ${product.name}...`);

      try {
        // Verificar se produto já existe
        const existingProduct = await prisma.product.findUnique({
          where: { slug: product.slug },
        });

        if (existingProduct) {
          console.log(`⚠️  Produto já existe, pulando...`);
          continue;
        }

        // Criar produto
        const createdProduct = await prisma.product.create({
          data: {
            name: product.name,
            slug: product.slug,
            description: product.description,
            story: product.story,
            price: product.price,
            originalPrice: product.originalPrice,
            categoryId: categoryMap[product.category] || 'cat-3',
            rating: product.rating,
            reviewCount: product.reviews,
            isNew: product.isNew || false,
            isBestSeller: product.isBestSeller || false,
            isActive: true,
          },
        });

        console.log(`✅ Produto criado: ${createdProduct.id}`);

        // Adicionar imagens
        for (let i = 0; i < product.images.length; i++) {
          await prisma.productImage.create({
            data: {
              productId: createdProduct.id,
              url: product.images[i],
              alt: product.name,
              order: i,
            },
          });
        }
        console.log(`  📷 ${product.images.length} imagens adicionadas`);

        // Adicionar benefícios
        for (let i = 0; i < product.benefits.length; i++) {
          await prisma.productBenefit.create({
            data: {
              productId: createdProduct.id,
              text: product.benefits[i],
              order: i,
            },
          });
        }
        console.log(`  ✨ ${product.benefits.length} benefícios adicionados`);

        // Adicionar tags
        for (const tag of product.tags) {
          await prisma.productTag.create({
            data: {
              productId: createdProduct.id,
              name: tag,
            },
          });
        }
        console.log(`  🏷️  ${product.tags.length} tags adicionadas`);

        // Criar variantes (combinações de tamanho e cor)
        let variantCount = 0;
        for (const size of product.sizes) {
          for (const color of product.colors) {
            const sku = `${product.slug}-${size}-${color.name.toLowerCase().replace(/\s+/g, '-')}`;
            await prisma.productVariant.create({
              data: {
                productId: createdProduct.id,
                size: size,
                colorName: color.name,
                colorHex: color.hex,
                sku: sku,
                stock: Math.floor(product.stock / (product.sizes.length * product.colors.length)),
              },
            });
            variantCount++;
          }
        }
        console.log(`  🎨 ${variantCount} variantes criadas`);

        console.log(`✅ ${product.name} importado com sucesso!`);
      } catch (error) {
        console.error(`❌ Erro ao importar ${product.name}:`, error);
      }
    }

    console.log('\n\n🎉 Importação concluída!');
    console.log(`✅ Produtos processados: ${newProducts.length}`);
  } catch (error) {
    console.error('❌ Erro durante importação:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar importação
importProducts()
  .then(() => {
    console.log('\n✅ Script finalizado!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Erro fatal:', error);
    process.exit(1);
  });
