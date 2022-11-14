const Session = require("../models/session");
const rootDir = require("../utils/pathHelper.js");
const path = require("path");

exports.getOrderDetail = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "order.html"));
};

exports.postFetchOrderDetail = (req, res, next) => {
  const { orderId } = req.body;
  Session.findAll({
    where: {
      orderId: orderId,
    },
  })
    .then((result) => {
      const orderDetail = result.map((element) => element.dataValues);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(orderDetail));
    })
    .catch((err) => {
      console.log(err);
    });
};
