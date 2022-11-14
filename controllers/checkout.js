const rootDir = require("../utils/pathHelper.js");
const path = require("path");

exports.getCheckout = (req, res, next) => {
  res.render("checkout", {csrfToken: res.locals.csrfToken});
};
