const fs = require('fs').promises;

class CartManager {
  constructor(cartFilePath) {
    this.cartFilePath = cartFilePath;
  }

  async getAllCarts() {
    try {
      const cartsData = await fs.readFile(this.cartFilePath, 'utf-8');
      const carts = JSON.parse(cartsData);
      return carts;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const cartsData = await fs.readFile(this.cartFilePath, 'utf-8');
      const carts = JSON.parse(cartsData);
      const cart = carts.find((c) => c.id === cartId);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async createCart() {
    try {
      const newCart = { id: `CART-${Date.now()}`, products: [] };
      const cartsData = await fs.readFile(this.cartFilePath, 'utf-8');
      const carts = JSON.parse(cartsData);
      carts.push(newCart);
      await fs.writeFile(this.cartFilePath, JSON.stringify(carts, null, 2));
      return newCart;
    } catch (error) {
      throw error;
    }
  }

  async addToCart(cartId, productId, quantity = 1) {
    try {
      const cartsData = await fs.readFile(this.cartFilePath, 'utf-8');
      const carts = JSON.parse(cartsData);
      const cart = carts.find((c) => c.id === cartId);
      if (!cart) {
        throw new Error('Cart not found');
      }
      const productIndex = cart.products.findIndex((p) => p.product === productId);
      if (productIndex === -1) {
        cart.products.push({ product: productId, quantity });
      } else {
        cart.products[productIndex].quantity += quantity;
      }
      await fs.writeFile(this.cartFilePath, JSON.stringify(carts, null, 2));
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async updateCartProductQuantity(cartId, productId, quantity) {
    try {
      const cartsData = await fs.readFile(this.cartFilePath, 'utf-8');
      const carts = JSON.parse(cartsData);
      const cart = carts.find((c) => c.id === cartId);
      if (!cart) {
        throw new Error('Cart not found');
      }
      const productIndex = cart.products.findIndex((p) => p.product === productId);
      if (productIndex === -1) {
        throw new Error('Product not found in cart');
      }
      cart.products[productIndex].quantity = quantity;
      await fs.writeFile(this.cartFilePath, JSON.stringify(carts, null, 2));
      return cart;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartManager;
