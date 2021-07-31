var admin = require("firebase-admin");
const orderModel = require("../models/OrderModel");
const deviceModel = require("../models/DeviceModel");

const listStatus = [
  // {status: "Chờ Xác Nhận", description: 'Chờ Xác Nhận Đơn Hàng'},
  { status: "Xác Nhận Đơn Hàng", description: "Xác nhận đơn hàng" },
  {
    status: "Đang Giao Hàng",
    description: "Tài xế đang giao hàng đến cho bạn",
  },
  { status: "Đã Giao", description: "Đơn hàng của bạn đã được giao" },
  { status: "Huỷ Đơn Hàng", description: "Đơn hàng của bạn đã bị huỷ" },
];

const getDescriptionStatus = (listStatus, status) => {
  const result = listStatus.find((item) => item.status === status);
  if (result) {
    return result.description;
  }
  return status;
};

class OrderController {
  async sendOrder(req, res) {
    try {
      let shipping_id;
      let order_id;
      const { shipping, user_id, payment_id, products } = req.body.data;
      const infoShipping = await orderModel.postInformationShipping(shipping);
      if (infoShipping.results) {
        shipping_id = infoShipping.results.insertId;
      }
      const order = await orderModel.postOrder(
        user_id,
        shipping_id,
        payment_id,
        products
      );
      if (order.results) {
        order_id = order.results.insertId;
      }
      const orderDetail = await orderModel.postOrderDetail(order_id, products);
      return res.status(201).send({
        order_id,
        message: "Đặt Hàng Thành Công",
      });
    } catch (error) {
      return res.status(500).send({
        message: error,
      });
    }
  }

  async getOrderHistory(req, res) {
    try {
      let page = 1;
      if (req.query.page) page = req.query.page;
      const uid = req.params.user_id;
      const data = await orderModel.getOrderHistory(uid, page);
      if (data.results.length === 0) {
        return res.status(200).send({
          data: data.results,
          page: Number(page),
          hasNext: false,
        });
      }
      return res.status(200).send({
        data: data.results,
        page: Number(page),
        hasNext: true,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async countOrderHistory(req, res) {
    try {
      const uid = req.params.user_id;
      const data = await orderModel.countOrderHistory(uid);
      return res.status(200).send({
        data: data.results,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async getVoucher(req, res) {
    try {
      const data = await orderModel.getVoucher();
      return res.status(200).send({
        data: data.results,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async getLastOrderStatusByUserId(req,res) {
    try {
      const user_id = req.params.user_id;
      const data = await orderModel.getLastOrderStatusByUserId(user_id);
      return res.status(200).send({
        data: data.results,
      });
    } catch (error) {
      return res.status(500).send({
        message: error,
      });
    }
  }

  //admin
  async getAllOrder(req, res) {
    try {
      let page = 1;
      if (req.query.page) page = req.query.page;
      const data = await orderModel.getOrder(page);
      if (data.results.length === 0) {
        return res.status(200).send({
          data: data.results,
          page: Number(page),
          hasNext: false,
        });
      }
      return res.status(200).send({
        data: data.results,
        page: Number(page),
        hasNext: true,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async getOrderDetail(req, res) {
    try {
      const order_id = req.params.order_id;
      const data = await orderModel.getDetailOrder(order_id);
      return res.status(200).send({
        data: data.results,
      });
    } catch (error) {
      return res.status(500).send({
        message: error,
      });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const order_id = req.params.order_id;
      const status = req.body.status;
      const user_id = req.body.user_id;
      const data = await orderModel.updateOrderStatus(status, order_id);
      if (user_id && Number(user_id) !== -1) {
        const devices = await deviceModel.getDevicesByUserId(user_id);
        if(devices?.results?.length > 0) {
          const deviceTokens = devices.results.map((item) => item.device_token);
          await admin.messaging().sendToDevice(
              deviceTokens,
              {
                data: {
                  title: "Khoái Khẩu",
                  message: getDescriptionStatus(listStatus, data.results),
                },
              },
              {
                // Required for background/quit data-only messages on iOS
                contentAvailable: true,
                // Required for background/quit data-only messages on Android
                priority: "high",
              }
          );
        }
      }
      return res.status(201).send({
        data: data.results,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async getAllVoucher(req, res) {
    try {
      const data = await orderModel.getAllVoucher();
      return res.status(200).send({
        data: data.results,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async addVoucher(req, res) {
    try {
      const addData = req.body.data;
      const data = await orderModel.addVoucher(addData);
      return res.status(201).send({
        data: data.results,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async updateVoucher(req, res) {
    try {
      const voucherId = req.params.voucher_id;
      const updateData = req.body.data;
      const data = await orderModel.updateVoucher(updateData, voucherId);
      return res.status(201).send({
        data: data.results,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async deleteVoucher(req, res) {
    try {
      const voucherId = req.params.voucher_id;
      await orderModel.deleteVoucher(voucherId);
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

module.exports = new OrderController();
