const sequelize = require('../config/mysql');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

// Define User model
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('customer', 'admin'), defaultValue: 'customer' },
}, {
  timestamps: true,
});

// Hash password before create/update
User.beforeCreate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});
User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

// instance method for matching password
User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Category
const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
}, { timestamps: true });

// Product
const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
  image: { type: DataTypes.STRING },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  ratings: { type: DataTypes.FLOAT, defaultValue: 0 },
  numReviews: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { timestamps: true });

// Order and OrderItem
const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  paymentMethod: { type: DataTypes.STRING, allowNull: false },
  paymentResult: { type: DataTypes.JSON },
  totalAmount: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
  status: { type: DataTypes.ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'), defaultValue: 'Pending' },
  isPaid: { type: DataTypes.BOOLEAN, defaultValue: false },
  paidAt: { type: DataTypes.DATE },
  isDelivered: { type: DataTypes.BOOLEAN, defaultValue: false },
  deliveredAt: { type: DataTypes.DATE },
}, { timestamps: true });

const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
}, { timestamps: false });

// Cart
const Cart = sequelize.define('Cart', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  totalPrice: { type: DataTypes.FLOAT, defaultValue: 0 },
}, { timestamps: true });

const CartItem = sequelize.define('CartItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
}, { timestamps: false });

// Associations
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'items' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Order,
  OrderItem,
  Cart,
  CartItem,
};
