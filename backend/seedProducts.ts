import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding products from original mock data...');

  await prisma.product.deleteMany();

  const products = [
    {
      name: '1000W BLDC Motor',
      description: 'High torque 1000W Brushless DC Motor suitable for heavy load E-Rickshaws.',
      price: 4500,
      stock: 50,
      category: Category.MOTORS,
      imageUrl: 'https://m.media-amazon.com/images/I/51QqeHpooaL._AC_UF1000,1000_QL80_.jpg',
    },
    {
      name: '48V Controller',
      description: 'Heavy duty 48V motor controller with high heat dissipation.',
      price: 2200,
      stock: 5, 
      category: Category.CONTROLLERS,
      imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2022/2/VP/KY/SQ/10701821/e-rickshaw-controller.jpg',
    },
    {
      name: '60V Lead Acid Battery',
      description: 'Premium Lead Acid battery set designed specifically for long E-Rickshaw mileage.',
      price: 8900,
      stock: 20, // "In Stock"
      category: Category.BATTERIES,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkiM2YDl0gQ9HCnHUSHCNtEOfH--1pPZ0VJJDRbaZjgp0-xHsgkBOj0Js&s=10',
    },
    {
      name: 'Front Shocker Set (Item 1)',
      description: 'Heavy duty front suspension shocker set for E-Rickshaws.',
      price: 1500,
      stock: 0, // "Out of Stock"
      category: Category.BODY_PARTS, // Mapped "Suspension" to BODY_PARTS
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqragUZScdDSb0-Uw0_-s3y6Ux8YpFpqqoTXUjqQf0TA&s=10',
    },
    {
      name: 'Front Shocker Set (Item 2)',
      description: 'Heavy duty front suspension shocker set for E-Rickshaws.',
      price: 1500,
      stock: 0,
      category: Category.BODY_PARTS,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqragUZScdDSb0-Uw0_-s3y6Ux8YpFpqqoTXUjqQf0TA&s=10',
    },
    {
      name: 'Front Shocker Set (Item 3)',
      description: 'Heavy duty front suspension shocker set for E-Rickshaws.',
      price: 1500,
      stock: 0,
      category: Category.BODY_PARTS,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqragUZScdDSb0-Uw0_-s3y6Ux8YpFpqqoTXUjqQf0TA&s=10',
    },
    {
      name: 'Front Shocker Set (Item 4)',
      description: 'Heavy duty front suspension shocker set for E-Rickshaws.',
      price: 1500,
      stock: 0,
      category: Category.BODY_PARTS,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqragUZScdDSb0-Uw0_-s3y6Ux8YpFpqqoTXUjqQf0TA&s=10',
    },
    {
      name: 'Front Shocker Set (Item 5)',
      description: 'Heavy duty front suspension shocker set for E-Rickshaws.',
      price: 1500,
      stock: 0,
      category: Category.BODY_PARTS,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqragUZScdDSb0-Uw0_-s3y6Ux8YpFpqqoTXUjqQf0TA&s=10',
    },
    {
      name: 'Front Shocker Set (Item 6)',
      description: 'Heavy duty front suspension shocker set for E-Rickshaws.',
      price: 1500,
      stock: 0,
      category: Category.BODY_PARTS,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqragUZScdDSb0-Uw0_-s3y6Ux8YpFpqqoTXUjqQf0TA&s=10',
    },
    {
      name: 'Front Shocker Set (Item 7)',
      description: 'Heavy duty front suspension shocker set for E-Rickshaws.',
      price: 1500,
      stock: 0,
      category: Category.BODY_PARTS,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqragUZScdDSb0-Uw0_-s3y6Ux8YpFpqqoTXUjqQf0TA&s=10',
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }

  console.log('Successfully seeded the original dummy data into the database!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
