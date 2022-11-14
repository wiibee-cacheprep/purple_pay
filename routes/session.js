// Accept incoming request from checkout
// Return response with sessionId
const express = require("express");
const router = express.Router();
const rootDir = require(".././utils/pathHelper.js");
const path = require("path");

const sessionController = require("../controllers/session");
const merchantController = require("../controllers/merchantProfile");
const apiKeyController = require("../controllers/apiKey");
const orderController = require("../controllers/order");
const checkoutController = require("../controllers/checkout");

const authController = require("../controllers/auth");

// Middleware
const isAuth = require("../middleware/isAuth");

// console.log(rootDir);

// Sign Up
router.get("/sign_up", authController.getSignUp);
router.post("/sign_up", authController.postSignUp);

// Login
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

// Logout
router.get("/logout", authController.getLogout);
router.post("/logout", authController.postLogout);

// Route handling middlewares
router.get("/checkout", isAuth, checkoutController.getCheckout);

// Merchant Profile Creation
router.get("/create_merchant", isAuth, merchantController.getCreateMerchant);
router.post("/create_merchant", isAuth, merchantController.postCreateMerchant);

// Get Merchant Profile
// Given email ID or phone number - return merchant Profile

// Create API Key given merchant profile

router.get("/create_api_key", isAuth, apiKeyController.getCreateApiKey);
router.post("/create_api_key", isAuth, apiKeyController.postCreateApiKey);
router.get(
  "/get_merchant_api_keys/:merchantId", isAuth,
  apiKeyController.getMerchantApiKeys
);

// GIven API Key + order id - return sessionId
router.post("/create_session", isAuth, sessionController.postFetchSessionId);
module.exports = router;

// router.get("/session_list", sessionController.getAllSessions); // Get all sessions associate with an order_id

// router.get("/session_detail") - return a session details given session_id

// router.get("/order_detail") - return a order details given session_id
router.get("/order_detail", isAuth, orderController.getOrderDetail);

router.post("/order_detail", isAuth, orderController.postFetchOrderDetail);

// router.post("/create_api_key")    // create api key when merchant registers - write to DB - merchant_id | api_key
// router.get("/get_api_key")     // retuns API key for a merchant

// export interface Session {
//     id: string;
//     merchant_id: string; // TODO: check if something better can be used here
//     order_id: string;
//     amount_value: number; // Amount always in $ or MATIC
//     pricing: Record<string, Token>;
//     expires_at: string; // ISO date string
//     created_at: string;
//   }
