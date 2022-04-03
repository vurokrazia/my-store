const boom = require('@hapi/boom');
const faker = require('faker');
class ProductServices {
  constructor() {
    this.products = []
    this.generate()
  }
  generate() {
    this.products.push(
      {
        id: "11111",
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: false
      }
    )
    for (let index = 0; index < 100; index++) {
      this.products.push(
        {
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(), 10),
          image: faker.image.imageUrl(),
          isBlock: faker.datatype.boolean()
        }
      )
    }
  }
  async create({ name, price, image }) {
    const newProduct = {
      id: faker.datatype.uuid(),
      name,
      price,
      image,
      isBlock:  faker.datatype.boolean()
    }
    this.products.push(newProduct)
    return newProduct
  }
  async find(id) {
    const product = this.products.find(item => item.id === id)
    if (!product)
      throw boom.notFound('product not found');
    if (product.isBlock)
      throw boom.conflict('product not found');
    return product
  }
  async all() {
    return this.products
  }
  async update(id, { name, price, image }) {
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1)
      throw boom.notFound('product not found');
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...{
        name,
        image,
        price
      }
    }
    return this.products[index]
  }
  async delete(id) {
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1)
      throw new Error('Not found')
    this.products.slice(index, 1)
    return { id }
  }
}

module.exports = ProductServices
