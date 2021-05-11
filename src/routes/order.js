const express = require("express");
const route = express.Router();

const orderController = require("../controllers/OrderController");
const verifyToken = require("../middlewares/verifyToken");

route.get("/get-voucher", orderController.getVoucher);
route.get("/:user_id", verifyToken, orderController.getOrderHistory);
route.get(
  "/count-order/:user_id",
  verifyToken,
  orderController.countOrderHistory
);
route.post("/send-order", verifyToken, orderController.sendOrder);

module.exports = route;
