import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

import partRoutes from './routes/partRoutes';

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to debVolt API');
});

app.use('/api/parts', partRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
