import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { slug: 'cookware',    nameEn: 'Cookware',           nameRw: 'Ibikoresho byo guteka',        position: 1 },
  { slug: 'appliances',  nameEn: 'Cooking Appliances', nameRw: 'Imashini zo guteka',           position: 2 },
  { slug: 'stoves',      nameEn: 'Stoves',             nameRw: 'Amashyiga',                      position: 3 },
  { slug: 'tools',       nameEn: 'Utensils & Tools',   nameRw: 'Ibikoresho bito byo mu gikoni', position: 4 },
  { slug: 'storage',     nameEn: 'Food Storage',       nameRw: 'Kubika ibiribwa',               position: 5 },
  { slug: 'tableware',   nameEn: 'Tableware',          nameRw: 'Ibikoresho byo ku meza',        position: 6 },
  { slug: 'drinkware',   nameEn: 'Drinkware',          nameRw: 'Ibikoresho byo kunywera',       position: 7 },
  { slug: 'bakeware',    nameEn: 'Bakeware',           nameRw: 'Ibikoresho byo kubika (oven)',  position: 8 },
];

type P = {
  cat: string; slug: string; nameEn: string; nameRw: string;
  priceRwf: number; oldPriceRwf?: number; colors?: string[];
  featured?: boolean; rating?: number; reviewCount?: number;
};

const products: P[] = [
  { cat: 'cookware',   slug: 'stainless-saucepan',       nameEn: 'Stainless Steel Saucepan',  nameRw: 'Isafuriya ya feri',           priceRwf: 18000, oldPriceRwf: 22000, colors: ['Silver'], featured: true, rating: 4.6, reviewCount: 12 },
  { cat: 'cookware',   slug: 'non-stick-frying-pan',     nameEn: 'Non-Stick Frying Pan',      nameRw: 'Ipan idafata (Non-stick)',    priceRwf: 22000, colors: ['Black','Red'], featured: true, rating: 4.8, reviewCount: 31 },
  { cat: 'cookware',   slug: 'copper-skillet',           nameEn: 'Copper Skillet',            nameRw: 'Ipan y\u2019umuringa',         priceRwf: 35000, colors: ['Copper'], rating: 4.4, reviewCount: 8 },
  { cat: 'cookware',   slug: 'non-stick-pots-set',       nameEn: 'Non-Stick Pots Set (3pcs)', nameRw: 'Set y\u2019amasafuriya (3)',   priceRwf: 48000, oldPriceRwf: 60000, featured: true, rating: 4.7, reviewCount: 19 },
  { cat: 'appliances', slug: 'electric-kettle',          nameEn: 'Electric Kettle',           nameRw: 'Icyombo cy\u2019amashanyarazi', priceRwf: 25000, colors: ['White','Black'], featured: true, rating: 4.5, reviewCount: 22 },
  { cat: 'appliances', slug: 'rice-cooker',              nameEn: 'Rice Cooker',               nameRw: 'Imashini iteka umuceri',      priceRwf: 45000, rating: 4.3, reviewCount: 10 },
  { cat: 'appliances', slug: 'air-fryer',                nameEn: 'Air Fryer 5L',              nameRw: 'Air Fryer 5L',                priceRwf: 120000, oldPriceRwf: 145000, colors: ['Black'], featured: true, rating: 4.9, reviewCount: 44 },
  { cat: 'appliances', slug: 'electric-pressure-cooker', nameEn: 'Electric Pressure Cooker',  nameRw: 'Icyuma giteka vuba (EPC)',     priceRwf: 95000, rating: 4.6, reviewCount: 17 },
  { cat: 'appliances', slug: 'microwave-oven',           nameEn: 'Microwave Oven 20L',        nameRw: 'Microwave 20L',               priceRwf: 130000, rating: 4.2, reviewCount: 6 },
  { cat: 'stoves',     slug: 'gas-stove-2-burner',       nameEn: '2-Burner Gas Stove',        nameRw: 'Ishyiga rya gaze (2)',        priceRwf: 60000, rating: 4.4, reviewCount: 14 },
  { cat: 'stoves',     slug: 'induction-hob',            nameEn: 'Induction Hob',             nameRw: 'Ishyiga rya induction',       priceRwf: 75000, oldPriceRwf: 89000, rating: 4.5, reviewCount: 9 },
  { cat: 'stoves',     slug: 'improved-cookstove',       nameEn: 'Improved Cookstove',        nameRw: 'Ishyiga ryateye imbere',      priceRwf: 15000, featured: true, rating: 4.7, reviewCount: 27 },
  { cat: 'tools',      slug: 'silicone-spatula-set',     nameEn: 'Silicone Spatula Set',      nameRw: 'Set ya spatula',              priceRwf: 8000, colors: ['Grey','Red','Green'], rating: 4.6, reviewCount: 33 },
  { cat: 'tools',      slug: 'measuring-cups',           nameEn: 'Measuring Cups Set',        nameRw: 'Ibikombe bipima',             priceRwf: 6000, rating: 4.3, reviewCount: 5 },
  { cat: 'tools',      slug: 'chopping-board',           nameEn: 'Bamboo Chopping Board',     nameRw: 'Akabaho ko gukatiraho',       priceRwf: 5000, featured: true, rating: 4.8, reviewCount: 21 },
  { cat: 'tools',      slug: 'knife-sharpener',          nameEn: 'Kitchen Knife Sharpener',   nameRw: 'Inyo y\u2019imbugita',         priceRwf: 4500, rating: 4.1, reviewCount: 4 },
  { cat: 'storage',    slug: 'food-containers-set',      nameEn: 'Food Storage Containers',   nameRw: 'Ibikoresho byo kubika ibiryo', priceRwf: 12000, colors: ['Clear'], rating: 4.5, reviewCount: 15 },
  { cat: 'tableware',  slug: 'dinnerware-set-24',        nameEn: '24-Piece Dinnerware Set',   nameRw: 'Set y\u2019amasahani (24)',    priceRwf: 55000, oldPriceRwf: 68000, featured: true, rating: 4.7, reviewCount: 18 },
  { cat: 'tableware',  slug: 'cutlery-set',              nameEn: 'Cutlery Set',               nameRw: 'Set ya farishe n\u2019amakanya', priceRwf: 20000, rating: 4.4, reviewCount: 11 },
  { cat: 'drinkware',  slug: 'thermo-water-bottle',      nameEn: 'Thermo Insulated Bottle',   nameRw: 'Icupa gifata ubushyuhe',      priceRwf: 15000, colors: ['Green','Grey'], featured: true, rating: 4.8, reviewCount: 29 },
  { cat: 'drinkware',  slug: 'glass-tumblers-6',         nameEn: 'Glass Tumblers (6)',        nameRw: 'Ibirahuri (6)',               priceRwf: 14000, rating: 4.2, reviewCount: 7 },
  { cat: 'bakeware',   slug: 'baking-tray-set',          nameEn: 'Baking Tray Set',           nameRw: 'Set ya treyi zo kubika',      priceRwf: 16000, rating: 4.3, reviewCount: 6 },
];

async function main() {
  console.log('Seeding…');
  const catIds: Record<string, string> = {};
  for (const c of categories) {
    const created = await prisma.category.upsert({
      where: { slug: c.slug }, update: { nameEn: c.nameEn, nameRw: c.nameRw, position: c.position }, create: c,
    });
    catIds[c.slug] = created.id;
  }
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug, nameEn: p.nameEn, nameRw: p.nameRw,
        descriptionEn: `${p.nameEn} — quality kitchenware available at Classy Kitchen Utensils, Kigali (City Plaza).`,
        descriptionRw: `${p.nameRw} — ibikoresho byiza biboneka kuri Classy Kitchen Utensils, Kigali (City Plaza).`,
        priceRwf: p.priceRwf, oldPriceRwf: p.oldPriceRwf ?? null,
        colors: p.colors ?? [], rating: p.rating ?? 0, reviewCount: p.reviewCount ?? 0,
        stock: 25, isFeatured: Boolean(p.featured), categoryId: catIds[p.cat],
        images: { create: [{ url: '/placeholder-product.jpg', alt: p.nameEn, position: 0 }] },
      },
    });
  }
  console.log(`Done: ${categories.length} categories, ${products.length} products.`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
