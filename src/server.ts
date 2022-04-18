import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import config from './config';
import { userRoutes } from './handlers/user.handler';
import { productRoutes } from './handlers/products.handler';
import { orderRoutes } from './handlers/orders.handler';
import { dashboardRoutes } from './handlers/dashboard.handler';

const app: express.Application = express();
const port: string | number = config.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.get('/', (_req: Request, res: Response): void => {
  res.send('Welcome to backend store');
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);
dashboardRoutes(app);
app.use((_req: Request, res: Response): void => {
  res.status(400).json({
    message:
      'ohh you are lost, read the API documentation to find your way back home',
  });
});

app.listen(port, (): void => {
  console.log(`Server started on port ${port}`);
});

export default app;
