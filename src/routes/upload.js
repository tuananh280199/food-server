const express = require("express");
const route = express.Router();

const userController = require("../controllers/UserController");
const uploadImg = require("../middlewares/uploadImage");
const verifyToken = require("../middlewares/verifyToken");

route.put("/public/:id", [verifyToken, uploadImg], userController.updateAvatar);

module.exports = route;
