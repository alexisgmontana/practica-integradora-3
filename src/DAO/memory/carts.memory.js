class CartsMemory {
  constructor() {
    this.carts = [];
  }

  async getCartByUserId(userId) {
    return this.carts.find((cart) => cart.userId === userId);
  }

  async createCart(cart) {
    this.carts.push(cart);
    return cart;
  }
}

export default new CartsMemory();
