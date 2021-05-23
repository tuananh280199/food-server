const express = require("express");
const route = express.Router();

const userController = require("../controllers/UserController");
const verifyToken = require("../middlewares/verifyToken");

route.put("/:id", verifyToken, userController.updateUser);
//admin
route.get("/get-user", verifyToken, userController.getUser);
route.get("/search-by-name", verifyToken, userController.searchUserByName);

module.exports = route;
