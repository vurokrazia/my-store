const express = require("express")

const productsRouter = require("./products.router")
const categoriesRouter = require("./categories.router")
const userRouter = require("./users.router")

function routerApi(app) {
  const router = express.Router()
  app.use(express.json())
  app.use('/api/v1', router)
  router.use('/products', productsRouter)
  router.use('/categories', categoriesRouter)
  router.use('/users', userRouter)
}

module.exports = routerApi
