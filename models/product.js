const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
})

module.exports = Product;




// this oldest code for model without sequelize

// const Cart = require('./cart');
// const conn = require('../util/db');
// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return conn.execute('INSERT INTO products(title, imageUrl, description, price) VALUES (?, ?, ?, ?)', 
//       [this.title, this.imageUrl, this.description, this.price]);  
//   }

//   static deleteById(id) {
    
//   }

//   static fetchAll() {
//    return conn.execute('SELECT * FROM products');
//   }

//   static findById(id) {
//     return conn.execute('SELECT * FROM products WHERE products.id = ?', [id]);
//   }
// };
