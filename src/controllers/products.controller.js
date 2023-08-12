import { productService } from '../services/products.service.js';

export const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, query, sort } = req.query;
    const products = await productService.getAllProducts(limit, page, query, sort);
    return res.json({ products });
  } catch (error) {
    res.status(401).send(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productService.getProductById(pid);
    if (product) {
      res.status(200).send({ status: 'success', data: product });
    } else {
      res.status(404).send({ status: 'error', message: 'Product not found' });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    await productService.createProduct(newProduct);
    res.status(200).send({ status: 'success', message: 'Product added successfully' });
  } catch (error) {
    res.status(400).send({ status: 'error', message: error.message });
  }
};
