const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.get('/:cartId', (req, res) => {
  const { cartId } = req.params;

  Cart.findById(cartId, (err, cart) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }

    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Cart not found' });
    }

    return res.status(200).json({ status: 'success', data: cart });
  });
});

router.post('/', (req, res) => {
  const newCart = new Cart();

  newCart.save((err, cart) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }

    return res.status(201).json({ status: 'success', data: cart });
  });
});

router.put('/:cartId', (req, res) => {
  const { cartId } = req.params;
  const updatedCartData = req.body;

  Cart.findByIdAndUpdate(cartId, updatedCartData, { new: true }, (err, cart) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }

    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Cart not found' });
    }

    return res.status(200).json({ status: 'success', data: cart });
  });
});

router.delete('/:cartId', (req, res) => {
  const { cartId } = req.params;

  Cart.findByIdAndRemove(cartId, (err, cart) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }

    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Cart not found' });
    }

    return res.status(204).json();
  });
});

module.exports = router;
