import CartMongo from '../dao/mongo/carts.mongo.js';
import { UserModel } from '../DAO/mongo/models/user.model.js';
import { productService } from './products.service.js';

class CartService {
  async createCart() {
    return CartMongo.createCart();
  }

  async getCartById(cartId) {
    return CartMongo.getCartById(cartId);
  }

  async addProductToCart(cartId, { product, quantity }) {
    return CartMongo.addProductToCart(cartId, { product, quantity });
  }

  async removeProductFromCart(cartId, productId) {
    return CartMongo.removeProductFromCart(cartId, productId);
  }

  async updateCartProducts(cartId, products) {
    return CartMongo.updateCartProducts(cartId, products);
  }

  async updateProductQuantity(cartId, productId, quantity) {
    return CartMongo.updateProductQuantity(cartId, productId, quantity);
  }

  async clearCart(cartId) {
    return CartMongo.clearCart(cartId);
  }

  async purchaseCart(cartId, userId) {
    const cart = await CartMongo.getCartWithProducts(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const user = await UserModel.findById(userId);

    const purchaseResult = await Promise.all(
      cart.products.map(async (item) => {
        const product = item.product;
        const quantity = item.quantity;
        const productInStock = await productService.checkStock(product, quantity);

        if (productInStock) {
          await productService.reduceStock(product, quantity);
          return product._id;
        }

        return null;
      })
    );

    const purchasedProducts = purchaseResult.filter((productId) => productId !== null);

    const totalAmount = calculateTotalAmount(cart.products);
    const ticketData = {
      code: generateUniqueCode(),
      purchase_datetime: new Date(),
      amount: totalAmount,
      purchaser: user.email,
      purchasedProducts,
    };

    await ticketService.createTicket(ticketData);
  }
}

export const cartService = new CartService();
