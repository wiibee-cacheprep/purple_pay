const express = require("express");
const bodyParser = require("body-parser");
const sessionRoutes = require("./routes/session.js");
const path = require("path");

const rootDir = require("./utils/pathHelper.js");
const sequelize = require("./utils/database");
const Sequelize = require("sequelize");

const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const csrf = require("csurf");
const csrfProtection = csrf();

const flash = require("connect-flash");

sequelize.define("sessionUsingStore", {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  expires: Sequelize.DATE,
  data: Sequelize.TEXT,
});

function extendDefaultFields(defaults, session) {
  return {
    data: defaults.data,
    expires: defaults.expires,
  };
}

var store = new SequelizeStore({
  db: sequelize,
  table: "sessionUsingStore",
  extendDefaultFields: extendDefaultFields,
});

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "keyboard cat",
    store: store,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
  })
);
store.sync();

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  // res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(sessionRoutes);
app.get("/", (req, res, next) => {
  // console.log("In the middleware!")
  //   res.send("<h1>This is Home Page</h1>");
  console.log(__dirname);
  res.render("checkout");
});

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found using ejs" });
});

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
