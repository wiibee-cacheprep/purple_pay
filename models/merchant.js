const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Merchant = sequelize.define("merchant", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    required: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    required: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    required: true,
    allowNull: false
  },
});

module.exports = Merchant;
