const fs = require('fs').promises;

class ProductManager {
  constructor(productFilePath) {
    this.productFilePath = productFilePath;
  }

  async getAllProducts() {
    try {
      const productsData = await fs.readFile(this.productFilePath, 'utf-8');
      const products = JSON.parse(productsData);
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const productsData = await fs.readFile(this.productFilePath, 'utf-8');
      const products = JSON.parse(productsData);
      const product = products.find((p) => p.id === productId);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(newProduct) {
    try {
      const productsData = await fs.readFile(this.productFilePath, 'utf-8');
      const products = JSON.parse(productsData);
      newProduct.id = `PRODUCT-${Date.now()}`;
      products.push(newProduct);
      await fs.writeFile(this.productFilePath, JSON.stringify(products, null, 2));
      return newProduct;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductManager;
