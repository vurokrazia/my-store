const boom = require('@hapi/boom');
const faker = require('faker');
const { getConnection } = require('../libs/postgresq');
const { pool } = require('./../libs/postgres.pool')
class ProductServices {
  constructor() {
    this.products = []
    this.generate()
    this.pool = pool
    this.pool.on('error', () => console.log)
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
      isBlock: faker.datatype.boolean()
    }
    this.products.push(newProduct)
    return newProduct
  }
  async find(id) {
    const query = 'select * from tasks'
    const rta = await this.pool.query(query)
    return rta.rows
    // const product = this.products.find(item => item.id === id)
    // if (rta.rows.size == 0 )
    //   throw boom.notFound('product not found');
    // if (product.isBlock)
    //   throw boom.conflict('product not found');
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
