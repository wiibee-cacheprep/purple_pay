const rootDir = require("../utils/pathHelper.js");
const path = require("path");
const Merchant = require("../models/merchant.js");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

exports.getSignUp = (req, res, next) => {
  console.log(`Inside getSignUp: CSRF - ${res.locals.csrfToken}`);
  let message = req.flash("message")
  if (message.length > 0) {
    message = message[0]
  } else {
    message = null
  }
  res.render("signUp", {
    message: req.flash("message"),
  });
};

exports.postSignUp = (req, res, next) => {
  const { email, phoneNumber, password, confirmPassword } = req.body;
  // console.log(email);

  Merchant.findOne({ where: { email: email } })
    .then((merchant) => {
      if (merchant) {
        console.log(merchant.dataValues);
        var message = "User Exists with this email id";
        return message
      }
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const merchantId = uuidv4();
        const newMerchant = Merchant.build({
          id: merchantId,
          name: "abc",
          email: email,
          phoneNumber: phoneNumber,
          password: hashedPassword,
        });
        newMerchant.save();
        var message = "Successfully created new merchant";

        return message;
      });
    })
    .then((message) => {
      console.log("Inside redirecting to Login");
      req.flash("message", message);
      return res.redirect("/sign_up");
      // res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getLogin = (req, res, next) => {
  //   const isLoggedIn = req.get("Cookie");
  console.log(`Inside GetLogin: ${req.session.isLoggedIn}`);

  res.render("login", {
    message: req.flash("message"),
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  Merchant.findOne({ where: { email: email } })
    .then((merchant) => {
      if (!merchant) {
        var message =
          "No User with this email ID found. Please change email Id or sign up";
        req.flash("message", message);
        return res.redirect("/login");
      } else {
        bcrypt
          .compare(password, merchant.password)
          .then((passwordMatch) => {
            if (passwordMatch) {
              var message = "Login Successful";
              req.session.isLoggedIn = true;
              req.session.user = merchant;
              req.session.save();
              res.send({ message: message });
            } else {
              var message = "Password does not match";
              req.flash("message", message);
              return res.redirect("/login");
            }
          })
          .catch((err) => {
            console.error(err);
            var message = "There was an error!";
            req.session.error = message;
            res.redirect("/login");
          });
      }
    })
    .catch((err) => console.error(err));
  //
};

exports.getLogout = (req, res, next) => {
  //   const isLoggedIn = req.get("Cookie");
  console.log(`Inside GetLogin: ${req.session.isLoggedIn}`);
  res.sendFile(path.join(rootDir, "views", "login.html"));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
