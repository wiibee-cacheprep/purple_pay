const Session = require("../models/session");
const APIKey = require("../models/apiKey");

const { v4: uuidv4 } = require("uuid");

function addHours(num_of_hours, date) {
  date.setTime(date.getTime() + num_of_hours * 60 * 60 * 1000);
  console.log("inside addHours", date);
  return date;
}

exports.postFetchSessionId = (req, res, next) => {
  const { orderId, amountValue, apiKey } = req.body;
  console.log(req.body);
  // Get the merchantId based on apiKey
  APIKey.findAll({ where: { apiKeyId: apiKey } })
    .then((result) => {
      // getMerchantIdFromAPIKey
      // console.log(result)
      const merchantId = result[0].dataValues.merchantId;
      console.log(result[0].dataValues.merchantId);
      // Generate session_id using UUID
      const sessionId = uuidv4();

      // Generate pricing - Token or otherwise
      const pricing = "token";

      // Generate checkout_status - add enum
      // const checkoutStatus = "In Progress";

      const createdAt = new Date();
      const updatedAt = new Date();
      const createdAtCopy = new Date(createdAt.getTime());

      const expiresAt = addHours(1, createdAtCopy);

      Session.create({
        id: sessionId,
        merchantId: merchantId,
        orderId: orderId,
        amountValue: amountValue,
        createdAt: createdAt,
        updatedAt: updatedAt,
        expiresAt: expiresAt,
        checkoutStatus: "In Progress",
      })
        .then((result) => {
          res.setHeader("Content-Type", "application/json");
          res.send(result.dataValues);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.getAllSessions = (req, res, next) => {
//   console.log("Inside getAllSessionsController");
//   Session.fetchAll()
//     .then((result) => {
//       res.setHeader("Content-Type", "application/json");
//       res.end(JSON.stringify(result.rows));
//     })
//     .catch((err) => console.log(err));
// };
