import { ProductRepository } from '../repositories/productRepository';
import { Category } from '@prisma/client';

const productRepository = new ProductRepository();

export class ProductService {
  async getProducts(categoryQuery?: string) {
    // Convert generic string to Prisma Category Enum (if provided)
    const category = categoryQuery ? (categoryQuery as Category) : undefined;
    return productRepository.findAll(category);
  }

  async getProductById(id: string) {
    return productRepository.findById(id);
  }
}
