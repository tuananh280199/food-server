const db = require("../../config/db");
const limit = 10;

class OrderModel {
  postInformationShipping(data) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO shipping VALUES(NULL, ?,?,?,?)";
      db.query(
        sql,
        [data.name, data.address, data.phone, data.note],
        (error, results) => {
          if (error) {
            reject({ error });
          } else {
            resolve({ results: results }); //TODO: trả về id shipping vừa thêm để khi order sẽ lấy id đó thêm vào order
          }
        }
      );
    });
  }

  postOrder(uid, shipping_id, payment_id, arrayProduct) {
    let totalPrice = 0;
    const status = "Chờ Xác Nhận";
    let dateNow = Math.floor(new Date().getTime() / 1000);
    for (let item = 0; item < arrayProduct.length; item++) {
      if (arrayProduct[item].product.sale === 1) {
        totalPrice +=
          arrayProduct[item].product.priceSale * arrayProduct[item].quantity;
      } else {
        totalPrice +=
          arrayProduct[item].product.price * arrayProduct[item].quantity;
      }
    }
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO `order` VALUES(NULL, ?,?,?,?,?,?)";
      db.query(
        sql,
        [uid, shipping_id, payment_id, totalPrice, status, dateNow],
        (error, results) => {
          if (error) {
            reject({ error });
          } else {
            resolve({ results }); //TODO: trả về id order vừa thêm để khi order sẽ lấy id đó thêm vào order_detail
          }
        }
      );
    });
  }

  postOrderDetail(order_id, arrayProduct) {
    let sql;
    return new Promise((resolve, reject) => {
      for (let item = 0; item < arrayProduct.length; item++) {
        sql = "INSERT INTO order_detail VALUES(NULL, ?,?,?,?)";
        if (arrayProduct[item].product.sale === 1) {
          db.query(
            sql,
            [
              order_id,
              arrayProduct[item].product.id,
              arrayProduct[item].product.priceSale,
              arrayProduct[item].quantity,
            ],
            (error, results) => {
              if (error) {
                reject({ error });
              }
            }
          );
        } else {
          db.query(
            sql,
            [
              order_id,
              arrayProduct[item].product.id,
              arrayProduct[item].product.price,
              arrayProduct[item].quantity,
            ],
            (error, results) => {
              if (error) {
                reject({ error });
              }
            }
          );
        }
      }
      resolve({ results: "success" });
    });
  }

  getOrderHistory(uid, page) {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      let sql =
        "SELECT `order`.id, `order`.order_date, `order`.`status`, `order`.total, shipping.shipping_address, payment.payment_method FROM `order`, payment, shipping WHERE `order`.payment_id = payment.id AND `order`.shipping_id = shipping.id AND `order`.user_id = ? ORDER BY `order`.order_date DESC LIMIT ?, ?";
      db.query(sql, [uid, offset, limit], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  countOrderHistory(uid) {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT COUNT(id) as numberOder FROM `order` WHERE `order`.user_id = ?";
      db.query(sql, [uid], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results[0] });
        }
      });
    });
  }

  getVoucher() {
    return new Promise((resolve, reject) => {
      let dateNow = Math.floor(new Date().getTime() / 1000);
      let sql = "SELECT voucher.* FROM voucher WHERE expired_in - ? > 0";
      db.query(sql, [dateNow], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  //admin
  getOrder(page) {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      let sql =
        "SELECT `order`.id, `order`.user_id, `order`.order_date, `order`.`status`, `order`.total, shipping.shipping_address, shipping.shipping_phone, payment.payment_method, `user`.`name` FROM `order`, payment, shipping, `user` WHERE `order`.user_id = `user`.id AND `order`.payment_id = payment.id AND `order`.shipping_id = shipping.id ORDER BY `order`.order_date DESC LIMIT ?, ?";
      db.query(sql, [offset, limit], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  //SELECT order_detail.id, product.`name`, order_detail.product_price, order_detail.product_quantity FROM `order`, order_detail, product WHERE `order`.id = order_detail.order_id AND order_detail.product_id = product.id AND `order`.id = 9
  getDetailOrder(order_id) {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT order_detail.id, product.`name`, order_detail.product_price, order_detail.product_quantity FROM `order`, order_detail, product WHERE `order`.id = order_detail.order_id AND order_detail.product_id = product.id AND `order`.id = ?";
      db.query(sql, [order_id], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  updateOrderStatus(status, order_id) {
    return new Promise((resolve, reject) => {
      let sql = "UPDATE `order` SET status = ? WHERE id = ?";
      db.query(sql, [status, order_id], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: status });
        }
      });
    });
  }

  getAllVoucher() {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM voucher";
      db.query(sql, (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  addVoucher(data) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO voucher VALUES (NULL, ?, ?, ?, ?, ?)";
      db.query(
        sql,
        [
          data.name,
          data.discount_price,
          data.discount_percent,
          data.min_price_to_use,
          data.expired_in,
        ],
        (error, results) => {
          if (error) {
            reject({ error });
          } else {
            resolve({ results });
          }
        }
      );
    });
  }

  updateVoucher(data, voucherId) {
    return new Promise((resolve, reject) => {
      let sql =
        "UPDATE voucher SET name = ? , discount_price = ?, discount_percent = ?, min_price_to_use = ?, expired_in = ? WHERE id = ?";
      db.query(
        sql,
        [
          data.name,
          data.discount_price,
          data.discount_percent,
          data.min_price_to_use,
          data.expired_in,
          voucherId,
        ],
        (error, results) => {
          if (error) {
            reject({ error });
          } else {
            resolve({ results: results[0] });
          }
        }
      );
    });
  }

  deleteVoucher(voucherId) {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM voucher WHERE id = ?";
      db.query(sql, [voucherId], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results[0] });
        }
      });
    });
  }
}

module.exports = new OrderModel();
