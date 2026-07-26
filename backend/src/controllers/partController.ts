import { Request, Response } from 'express';
import prisma from '../prisma';

// Get all parts (Inventory)
export const getParts = async (req: Request, res: Response) => {
  try {
    const parts = await prisma.part.findMany();
    res.json(parts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch parts' });
  }
};

// Create a new part
export const createPart = async (req: Request, res: Response) => {
  try {
    const { name, brand, partCode, category, retailPrice, wholesalePrice, stockStatus, imageUrl } = req.body;
    
    const newPart = await prisma.part.create({
      data: {
        name,
        brand,
        partCode,
        category,
        retailPrice,
        wholesalePrice,
        stockStatus,
        imageUrl
      }
    });
    
    res.status(201).json(newPart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create part' });
  }
};
