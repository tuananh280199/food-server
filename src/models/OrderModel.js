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
        "SELECT `order`.id, `order`.order_date, `order`.`status`, `order`.total, shipping.shipping_address, payment.payment_method FROM `order`, payment, shipping WHERE `order`.payment_id = payment.id AND `order`.shipping_id = shipping.id AND `order`.user_id = ? LIMIT ?, ?";
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
      let sql = "SELECT voucher.* FROM voucher";
      db.query(sql, (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }
}

module.exports = new OrderModel();
