const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', (req, res) => {
  const { query, limit = 10, page = 1, sort } = req.query;
  const skip = (page - 1) * limit;

  const filter = query ? { category: query } : {};

  const sortOptions = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

  Product.find(filter)
    .skip(skip)
    .limit(parseInt(limit))
    .sort(sortOptions)
    .exec((err, products) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
      }

      Product.countDocuments(filter, (countErr, totalCount) => {
        if (countErr) {
          return res.status(500).json({ status: 'error', message: 'Internal server error' });
        }

        const totalPages = Math.ceil(totalCount / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        const nextPage = hasNextPage ? `?page=${page + 1}&limit=${limit}` : null;
        const prevPage = hasPrevPage ? `?page=${page - 1}&limit=${limit}` : null;

        return res.status(200).json({
          status: 'success',
          payload: products,
          totalPages,
          prevPage,
          nextPage,
          page: parseInt(page),
          hasPrevPage,
          hasNextPage,
        });
      });
    });
});

router.get('/:productId', (req, res) => {
  const { productId } = req.params;

  Product.findById(productId, (err, product) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }

    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Product not found' });
    }

    return res.status(200).json({ status: 'success', data: product });
  });
});

module.exports = router;
