const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const APIKey = sequelize.define("apiKey", {
  apiKeyId: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  merchantId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});

module.exports = APIKey;

// const sequelize = require("../utils/database");

// module.exports = class ApiKey {
//   constructor(merchant_id, api_key, created_at, last_updated_at) {
//     this.merchant_id = merchant_id;
//     this.api_key = api_key;
//     this.created_at = created_at;
//     this.last_updated_at = last_updated_at;
//   }

//   save() {
//     const query =
//       "INSERT INTO actor(act_id, act_fname, act_lname, act_gender) VALUES($1, $2, $3, $4) RETURNING *";
//     const values = [23, "this.api_key", "schwartz", "M"];
//     db.query(query, values)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => console.error(err));
//   }
//   static fetchAll() {
//     db.query("SELECT * FROM actor LIMIT 5;");
//   }

//   static fetchAllByMerchantId(merchant_id) {
//     return db.query('SELECT * FROM actor WHERE actor.act_id = $1', [merchant_id])
//   }
// };
