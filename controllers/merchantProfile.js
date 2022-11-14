const rootDir = require("../utils/pathHelper.js");
const path = require("path");
// const uuidv4 = require("uuid/v4")
// import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require("uuid");

const MerchantProfile = require("../models/merchantProfile");

exports.getCreateMerchant = (req, res, next) => {
  // console.log("Inside getAddMerchantProfile");
  res.sendFile(path.join(rootDir, "views", "merchantProfile.html"));
};

exports.postCreateMerchant = (req, res, next) => {
  console.log("Inside postCreateMerchant");
  const merchantId = uuidv4();

  const { name, email, phoneNumber, brandLogoUrl, description } = req.body;

  MerchantProfile.create({
    id: merchantId,
    name: name,
    phoneNumber: phoneNumber,
    email: email,
    brandLogoUrl: brandLogoUrl,
    description: description,
  })
    .then((result) => {
      // console.log(Object.keys(result));
      console.log(result.dataValues);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result.dataValues));
    })
    .catch((err) => {
      console.log(err);
    });
};
