const rootDir = require("../utils/pathHelper.js");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const APIKey = require("../models/apiKey");
const { type } = require("os");

// API to create API Key for a given merchant ID
exports.getCreateApiKey = (req, res, next) => {
  res.render("apiKey", {csrfToken: res.locals.csrfToken});
};

exports.postCreateApiKey = (req, res, next) => {
  // console.log(req.body);

  // Function to create API key
  const apiKeyId = uuidv4(); // Same as APIKey for a merchantId

  const { merchantId } = req.body;

  APIKey.create({
    apiKeyId: apiKeyId,
    merchantId: merchantId,
  })
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result.dataValues));
    })
    .catch((err) => {
      console.error(err);
    });
};

// API to get all API Keys for a given merchant_id
exports.getMerchantApiKeys = (req, res, next) => {
  const { merchantId } = req.params;
  APIKey.findAll({
    where: {
      merchantId: merchantId,
    },
  })
    .then((result) => {
      const apiKeys = result.map((element) => element.dataValues);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(apiKeys));
    })
    .catch((err) => {
      console.log(err);
    });
};
