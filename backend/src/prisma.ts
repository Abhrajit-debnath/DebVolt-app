import { PrismaClient } from '@prisma/client';

// Prisma 7.9.0 requires configuring the database connection when instantiating the client
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL
});

export default prisma;
