const faker = require('faker');
const express = require('express');

const router = express.Router();

router.get("/filter", (req, res) => {
  res.json(
    {
      d:1
    }
  );
});

router.get("/", (req, res) => {
  const products = [];
  for (let index = 0; index < 100; index++) {
    products.push(
      {
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      }
    )
  }
  res.json(
    products
  );
});

router.post("/", (req, res) => {
  const body = req.body
  res.json(
    {
      message: 'created',
      data: body
    }
  );
});

router.put("/:id", (req, res) => {
  const body = req.body
  res.json(
    {
      message: 'updated',
      data: body
    }
  );
});

router.delete("/:id", (req, res) => {
  res.status(204).send();
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json(
    {
      id,
      name: 'Product A',
      price: 1000
    }
  );
});

module.exports = router
