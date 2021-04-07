const express = require("express");
const route = express.Router();

const userController = require("../controllers/UserController");
const verifyToken = require("../middlewares/verifyToken");

route.put("/:id", verifyToken, userController.updateUser);

module.exports = route;
