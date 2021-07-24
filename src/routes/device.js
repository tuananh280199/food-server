const express = require("express");
const route = express.Router();

const deviceController = require("../controllers/DeviceController");

route.get("/:user_id", deviceController.getDevicesByUserId);
route.post("/add-device", deviceController.addDevice);
route.delete("/delete-device/user/:user_id/device/:device_token", deviceController.deleteDevice);

module.exports = route;
