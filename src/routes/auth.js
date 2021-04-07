const express = require("express");
const route = express.Router();

const authController = require("../controllers/AuthController");
const verifyToken = require("../middlewares/verifyToken");

route.post("/login", authController.login);
route.post("/logout", authController.logout);
route.post("/register", authController.register);
route.put("/reset-password/:id", verifyToken, authController.resetPassword);
route.post("/forgot-password", authController.forgotPassword);

module.exports = route;
