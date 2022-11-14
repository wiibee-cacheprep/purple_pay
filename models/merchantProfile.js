const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
const Merchant = require("./merchant");

const MerchantProfile = sequelize.define("merchantProfile", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  brandLogoUrl: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
});

MerchantProfile.belongsTo(Merchant);

module.exports = Merchant;
