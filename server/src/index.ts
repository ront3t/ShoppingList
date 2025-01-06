import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

//middleware
import {errorHandler} from './middleware/errorMiddleware'

// Import route files
import userRoutes from './routes/UserRoutes';
import AuthRoutes from './routes/AuthRoutes';
import shoppingListRoutes from './routes/ShoppingListRoutes';
import itemRoutes from './routes/ItemRoutes';
import categoryRoutes from './routes/CategoryRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/shopping-lists', shoppingListRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes);

//error middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
