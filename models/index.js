'use strict';
const Sequelize = require('sequelize');
const Merchant = require('./merchant');
const Product = require('./products');
const Personal = require('./personal');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Merchant = Merchant;
db.Product = Product;
db.Personal = Personal;

Merchant.init(sequelize);
Product.init(sequelize);
Personal.init(sequelize);

Merchant.associate(db);
Product.associate(db);


module.exports = db;
