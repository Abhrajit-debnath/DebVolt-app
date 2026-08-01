import prisma from '../prisma';
import { Category } from '@prisma/client';

export class ProductRepository {
  async findAll(category?: Category) {
    const where = category && category !== ('All' as any) ? { category } : {};
    return prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
    });
  }
}
