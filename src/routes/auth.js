const express = require("express");
const route = express.Router();

const authController = require("../controllers/AuthController");
const verifyToken = require("../middlewares/verifyToken");

route.post("/refresh-token", authController.refreshToken);
route.post("/login", authController.login);
route.post("/logout", authController.logout);
route.post("/register", authController.register);
route.put("/reset-password/:id", verifyToken, authController.resetPassword);
route.post("/check-exists-user", authController.checkExistsUser);
route.put("/forgot-password/:id", authController.forgotPassword);

module.exports = route;
