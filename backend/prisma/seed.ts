import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Categories grouped from the shop's product list. nameRw = Kinyarwanda.
const categories = [
  { slug: 'cookware',     nameEn: 'Cookware',              nameRw: 'Ibikoresho byo guteka',        position: 1 },
  { slug: 'appliances',   nameEn: 'Cooking Appliances',    nameRw: 'Imashini zo guteka',           position: 2 },
  { slug: 'stoves',       nameEn: 'Stoves',                nameRw: 'Amashyiga',                      position: 3 },
  { slug: 'tools',        nameEn: 'Utensils & Tools',      nameRw: 'Ibikoresho bito byo mu gikoni', position: 4 },
  { slug: 'storage',      nameEn: 'Food Storage',          nameRw: 'Kubika ibiribwa',               position: 5 },
  { slug: 'tableware',    nameEn: 'Tableware',             nameRw: 'Ibikoresho byo ku meza',        position: 6 },
];

// A few sample products per category (price in RWF). Add real ones later.
const products = [
  { cat: 'cookware',   slug: 'stainless-saucepan',   nameEn: 'Stainless Steel Saucepan', nameRw: 'Isafuriya ya feri',          priceRwf: 18000, featured: true },
  { cat: 'cookware',   slug: 'non-stick-frying-pan', nameEn: 'Non-Stick Frying Pan',     nameRw: 'Ipan idafata (Non-stick)',   priceRwf: 22000, featured: true },
  { cat: 'cookware',   slug: 'copper-skillet',       nameEn: 'Copper Skillet',           nameRw: 'Ipan y’umuringa',            priceRwf: 35000 },
  { cat: 'appliances', slug: 'electric-kettle',      nameEn: 'Electric Kettle',          nameRw: 'Ibyombo by’amashanyarazi',   priceRwf: 25000, featured: true },
  { cat: 'appliances', slug: 'rice-cooker',          nameEn: 'Rice Cooker',              nameRw: 'Imashini iteka umuceri',     priceRwf: 45000 },
  { cat: 'appliances', slug: 'air-fryer',            nameEn: 'Air Fryer',                nameRw: 'Air Fryer',                  priceRwf: 120000, featured: true },
  { cat: 'appliances', slug: 'electric-pressure-cooker', nameEn: 'Electric Pressure Cooker', nameRw: 'Icyuma giteka vuba (EPC)', priceRwf: 95000 },
  { cat: 'stoves',     slug: 'gas-stove-2-burner',   nameEn: '2-Burner Gas Stove',       nameRw: 'Ishyiga rya gaze (amatara 2)', priceRwf: 60000 },
  { cat: 'stoves',     slug: 'improved-cookstove',   nameEn: 'Improved Cookstove',       nameRw: 'Ishyiga ryateye imbere',     priceRwf: 15000 },
  { cat: 'tools',      slug: 'silicone-spatula-set', nameEn: 'Silicone Spatula Set',     nameRw: 'Set ya spatula',             priceRwf: 8000 },
  { cat: 'tools',      slug: 'measuring-cups',       nameEn: 'Measuring Cups Set',       nameRw: 'Ibikombe bipima',            priceRwf: 6000 },
  { cat: 'tools',      slug: 'chopping-board',       nameEn: 'Chopping Board',           nameRw: 'Akabaho ko gukatiraho',      priceRwf: 5000 },
  { cat: 'storage',    slug: 'food-containers-set',  nameEn: 'Food Storage Containers',  nameRw: 'Ibikoresho byo kubika ibiryo', priceRwf: 12000 },
  { cat: 'tableware',  slug: 'dinnerware-set-24',    nameEn: '24-Piece Dinnerware Set',  nameRw: 'Set y’amasahani (ibice 24)', priceRwf: 55000, featured: true },
  { cat: 'tableware',  slug: 'cutlery-set',          nameEn: 'Cutlery Set',              nameRw: 'Set ya farishe n’amakanya', priceRwf: 20000 },
  { cat: 'tableware',  slug: 'glass-tumblers-6',     nameEn: 'Glass Tumblers (6)',       nameRw: 'Ibirahuri (6)',              priceRwf: 14000 },
];

async function main() {
  console.log('Seeding…');
  const catIds: Record<string, string> = {};
  for (const c of categories) {
    const created = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { nameEn: c.nameEn, nameRw: c.nameRw, position: c.position },
      create: c,
    });
    catIds[c.slug] = created.id;
  }

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        nameEn: p.nameEn,
        nameRw: p.nameRw,
        descriptionEn: `${p.nameEn} available at Classy Kitchen Utensils, Kigali.`,
        descriptionRw: `${p.nameRw} biboneka kuri Classy Kitchen Utensils, Kigali.`,
        priceRwf: p.priceRwf,
        stock: 25,
        isFeatured: Boolean(p.featured),
        categoryId: catIds[p.cat],
        images: {
          create: [{ url: '/placeholder-product.jpg', alt: p.nameEn, position: 0 }],
        },
      },
    });
  }
  console.log(`Done: ${categories.length} categories, ${products.length} products.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
