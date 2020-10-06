const db = require('../db/db')
const { Sequelize } = require('sequelize')

const Product = db.define('product', {
  name: Sequelize.STRING,
  price: Sequelize.BIGINT,
  image: Sequelize.STRING
}, {
  freezeTableName: true,
  timestamps: false
}
)

const Category = db.define('category', {
  name: Sequelize.STRING
}, {
  freezeTableName: true,
  timestamps: false
}
)

const History = db.define('history', {
  invoice: Sequelize.STRING,
  cashier: Sequelize.STRING,
  date: Sequelize.DATE,
  orders: Sequelize.STRING,
  total: Sequelize.BIGINT
}, {
  freezeTableName: true,
  timestamps: false
}
)

const User = db.define('user', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  image: Sequelize.STRING
}, {
  freezeTableName: true,
  timestamps: false
}
)

Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' })
Category.hasOne(Product)

db
  .sync()
  .then(async () => {
    console.log('o')
  })
  .catch(error => {
    console.log(error)
  })

module.exports = { Product, Category, History, User }
