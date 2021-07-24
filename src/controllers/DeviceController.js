const deviceModel = require("../models/DeviceModel");

class DeviceController {
  async getDevicesByUserId(req, res) {
    try {
      const user_id = req.params.user_id;
      const data = await deviceModel.getDevicesByUserId(user_id);
      return res.status(200).send({
        data: data.results,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async addDevice(req, res) {
    try {
      const addData = req.body.data;
      const hasDevice = await deviceModel.hasDevice(
        addData.device_token,
        addData.user_id
      );
      if (hasDevice)
        return res.status(400).send({
          message: "Thiết bị đã tồn tại",
        });
      const data = await deviceModel.addDevice(addData);
      return res.status(201).send({
        data: data.results,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async deleteDevice(req, res) {
    try {
      const device_token = req.params.device_token;
      const user_id = req.params.user_id;
      await deviceModel.deleteDevice(device_token, user_id);
      return res.status(200).send({
        message: "Xoá Thành Công",
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }
}

module.exports = new DeviceController();
