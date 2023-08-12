class ProductsMemory {
  constructor() {
    this.products = [];
  }

  async getAllProducts() {
    return this.products;
  }

  async getProductById(pid) {
    return this.products.find((product) => product.id === pid);
  }

  async createProduct(product) {
    this.products.push(product);
    return product;
  }
}

export default new ProductsMemory();
