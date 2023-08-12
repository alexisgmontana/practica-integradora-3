import express from 'express';
import { addProductToCart, clearCart, createCart, getCartById, removeProductFromCart, updateCartProducts, updateProductQuantity } from '../controllers/carts.controller.js';
import { checkUser } from '../middlewares/auth.middlewares.js';

export const routerCarts = express.Router();

routerCarts.post('/', createCart);

routerCarts.get('/:cid', getCartById);

routerCarts.post('/:cid/products/:pid', checkUser, addProductToCart);

routerCarts.delete('/:cid/products/:pid', checkUser, removeProductFromCart);

routerCarts.put('/:cid', checkUser, updateCartProducts);

routerCarts.put('/:cid/products/:pid', checkUser, updateProductQuantity);

routerCarts.delete('/:cid', checkUser, clearCart);
