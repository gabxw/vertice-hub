import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    include: {
      variants: {
        orderBy: [{ size: 'asc' }, { colorName: 'asc' }],
        take: 5,
      },
    },
    take: 3,
  });

  console.log('\n=== PRODUCTS IN DATABASE ===\n');
  products.forEach(p => {
    console.log(`Product: ${p.name} (ID: ${p.id})`);
    console.log(`Slug: ${p.slug}`);
    console.log('Variants:');
    p.variants.forEach(v => {
      console.log(`  - ${v.size} ${v.colorName} (ID: ${v.id}, SKU: ${v.sku}, Stock: ${v.stock})`);
    });
    console.log('');
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
