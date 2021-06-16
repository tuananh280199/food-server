const express = require("express");
const route = express.Router();

const orderController = require("../controllers/OrderController");
const verifyToken = require("../middlewares/verifyToken");

route.get("/get-voucher", orderController.getVoucher);
route.get("/get-all-voucher", orderController.getAllVoucher);
route.get("/get-all-order", verifyToken, orderController.getAllOrder);
route.get("/:user_id", verifyToken, orderController.getOrderHistory);
route.get(
  "/count-order/:user_id",
  verifyToken,
  orderController.countOrderHistory
);
route.post("/send-order", verifyToken, orderController.sendOrder);
route.get("/get-order/:order_id", verifyToken, orderController.getOrderDetail);
route.put(
  "/update-status/:order_id",
  verifyToken,
  orderController.updateOrderStatus
);
route.post("/add-voucher", verifyToken, orderController.addVoucher);
route.put(
  "/update-voucher/:voucher_id",
  verifyToken,
  orderController.updateVoucher
);
route.delete(
  "/delete-voucher/:voucher_id",
  verifyToken,
  orderController.deleteVoucher
);

module.exports = route;
