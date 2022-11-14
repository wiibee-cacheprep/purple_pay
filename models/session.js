const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Session = sequelize.define("session", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  merchantId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  orderId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amountValue: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  expiresAt: {
    type: Sequelize.DATE,
  },
  checkoutStatus: {
    type: Sequelize.ENUM,
    values: ["In Progress", "Completed", "Failed"],
    defaultValue: "In Progress",
  },
});

module.exports = Session;

// export interface Session {
//     id: string;
//     merchant_id: string; // TODO: check if something better can be used here
//     order_id: string;
//     amount_value: number; // Amount always in $ or MATIC
//     pricing: Record<string, Token>;
//     expires_at: string; // ISO date string
//     created_at: string;
//   }

//// Webhook + User confirms in wallet - generates transaction hash - proof of something on chain - use to track transaction
