const express = require('express');
const ProductServices = require('./../services/product.service')
const router = express.Router();
const productService = new ProductServices()

const {validatorHandler} = require("./../middlewares/validator.handler")
const {createProductSchema,getProductSchema,updateProductSchema} = require("./../schemas/product.schema")

router.get("/filter", (req, res) => {
  res.json(
    {
      d: 1
    }
  );
});

router.get("/",
async (req, res) => {
  try {
    const products = await productService.all()
    res.json(
      products
    );
  } catch (error) {
    res.status(404).json(
      {
        message: error.message
      }
    )
  }
});

router.post("/",
validatorHandler(createProductSchema,"body"),
async (req, res) => {
  const body = req.body
  const newProduct = await productService.create(body)
  res.status(201).json(
    {
      message: 'created',
      data: newProduct
    }
  );
});

router.put("/:id",
validatorHandler(getProductSchema,"params"),
validatorHandler(updateProductSchema,"body"),
async (req, res) => {
  const { id } = req.params;
  const body = req.body
  const product = await productService.update(id, body)
  res.json(
    {
      message: 'updated',
      data: product
    }
  );
});

router.patch("/:id",
validatorHandler(getProductSchema,"params"),
validatorHandler(updateProductSchema,"body"),
async (req, res) => {
  const body = req.body
  res.json(
    {
      message: 'updated partial',
      data: body
    }
  );
});

router.delete("/:id",
validatorHandler(getProductSchema,"params"),
async (req, res) => {
  const { id } = req.params;
  const { message } = await productService.delete(id)
  res.status(204).send();
});

router.get("/:id",
validatorHandler(getProductSchema,"params"),
async (req, res, next) => {
  try {
    const { id } = req.params;
  const product = await productService.find(id)
  res.json(
    product
  );
  } catch (error) {
    next(error)
  }
});

module.exports = router
