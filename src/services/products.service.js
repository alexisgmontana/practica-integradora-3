import ProductMongo from '../DAO/mongo/products.mongo.js';

class ProductService {
  async getAllProducts(limit, page, query, sort) {
    return ProductMongo.getAllProducts(limit, page, query, sort);
  }

  async getProductById(pid) {
    return ProductMongo.getProductById(pid);
  }

  async createProduct(product) {
    return ProductMongo.createProduct(product);
  }

  async checkStock(product, quantity) {
    const productData = await ProductMongo.getProductById(product);

    if (!productData) {
      throw new Error('Producto no encontrado');
    }

    return productData.stock >= quantity;
  }

  async reduceStock(pid, quantity) {
    const productData = await ProductMongo.getProductById(pid);

    if (!productData) {
      throw new Error('Producto no encontrado');
    }

    if (productData.stock < quantity) {
      throw new Error('No hay suficiente stock');
    }

    productData.stock -= quantity;
    await productData.save();
  }
}

export const productService = new ProductService();
