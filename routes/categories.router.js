const faker = require('faker');
const express = require('express');

const router = express.Router();

router.get("/:id/products/:product_id", (req, res) => {
  const { id,product_id } = req.params;
  res.json(
    [{
      id,
      product_id
    }]
  );
});

module.exports = router
