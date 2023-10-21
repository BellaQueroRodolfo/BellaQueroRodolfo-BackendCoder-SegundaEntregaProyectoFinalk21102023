const express = require('express');
const router = express.Router();
const CartManager = require('../dao/managers/cartManager');
const cartManager = new CartManager();

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const result = await cartManager.removeFromCart(cartId, productId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.body.products;
    const result = await cartManager.updateCart(cartId, products);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;
    const result = await cartManager.updateCartItemQuantity(cartId, productId, quantity);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const result = await cartManager.clearCart(cartId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManager.getCartWithProducts(cartId);
    if (!cart) {
      res.status(404).json({ error: 'Cart not found' });
    } else {
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
