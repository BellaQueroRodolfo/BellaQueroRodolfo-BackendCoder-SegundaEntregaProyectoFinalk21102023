const express = require('express');
const router = express.Router();
const ProductManager = require('../dao/managers/productManager');
const productManager = new ProductManager();

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const result = await productManager.getProducts({
      limit: parseInt(limit),
      page: parseInt(page),
      sort,
      query,
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productManager.getProductById(productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
