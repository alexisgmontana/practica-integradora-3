import express from 'express';
import { createProduct, getAllProducts, getProductById } from '../controllers/products.controller.js';
import { checkAdmin } from '../middlewares/auth.middlewares.js';

const routerProducts = express.Router();

routerProducts.get('/', getAllProducts);

routerProducts.get('/:pid', getProductById);

routerProducts.post('/', checkAdmin, createProduct);

export default routerProducts;
