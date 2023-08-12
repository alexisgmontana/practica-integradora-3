import { cartService } from '../services/carts.service.js';

export const createCart = async (req, res) => {
  try {
    const newCart = await cartService.createCart();
    res.status(200).send({ status: 'success', data: newCart });
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.getCartById(cid);

    if (!cart) {
      res.status(404).send({ status: 'error', message: 'Cart not found' });
    } else {
      res.status(200).send({ status: 'success', data: cart.products });
    }
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    await cartService.addProductToCart(cid, { product: pid, quantity });

    res.status(200).json({ status: 'success', message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    await cartService.removeProductFromCart(cid, pid);

    res.status(200).json({ status: 'success', message: 'Product removed from cart' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateCartProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    await cartService.updateCartProducts(cid, products);

    res.status(200).json({ status: 'success', message: 'Cart updated' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    await cartService.updateProductQuantity(cid, pid, quantity);

    res.status(200).json({ status: 'success', message: 'Product quantity updated' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;

    await cartService.clearCart(cid);

    res.status(200).json({ status: 'success', message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
