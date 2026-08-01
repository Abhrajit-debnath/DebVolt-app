import { Request, Response } from 'express';
import { ProductService } from '../services/productService';

const productService = new ProductService();

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = typeof req.query.category === 'string' ? req.query.category : undefined;
        
        const products = await productService.getProducts(category);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await productService.getProductById(req.params.id as string);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};