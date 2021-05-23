const express = require("express");
const route = express.Router();

const categoryController = require("../controllers/CategoryController");
const verifyToken = require("../middlewares/verifyToken");

route.get("/", categoryController.getAllCategory);
//admin
route.get("/:category_id", categoryController.getCategory);
route.post("/add-category", verifyToken, categoryController.addCategory);
route.put(
  "/update-category/:category_id",
  verifyToken,
  categoryController.updateCategory
);
route.delete(
  "/delete-category/:category_id",
  verifyToken,
  categoryController.deleteCategory
);

module.exports = route;
