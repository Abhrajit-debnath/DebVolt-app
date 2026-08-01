import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

import partRoutes from './routes/partRoutes';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';

app.get('/health-check', (req: Request, res: Response) => {
  res.send('Welcome to debVolt API');
});

app.use('/api/auth', authRoutes);
app.use('/api/parts', partRoutes);
app.use('/api/products', productRoutes);

  if (process.env.NODE_ENV !== 'production') {                                     
      app.listen(port, () => {                                                       
        console.log(`Server is running on port ${port}`);                            
      });                                                                            
    }                                                                                
      
