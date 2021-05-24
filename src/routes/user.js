const express = require("express");
const route = express.Router();

const userController = require("../controllers/UserController");
const verifyToken = require("../middlewares/verifyToken");

route.get("/get-user", verifyToken, userController.getUser);
route.get("/search-by-name", verifyToken, userController.searchUserByName);
route.put("/update-role/:user_id", verifyToken, userController.updateRole);
route.put("/:id", verifyToken, userController.updateUser);
route.delete(
  "/delete-user/:user_id",
  verifyToken,
  userController.deleteCategory
);

module.exports = route;
