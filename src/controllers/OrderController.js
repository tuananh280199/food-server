const orderModel = require("../models/OrderModel");

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
}

module.exports = new OrderController();
