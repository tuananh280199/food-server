const db = require("../../config/db");

class DeviceModel {
  getDevicesByUserId(user_id) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM devices WHERE user_id = ?";
      db.query(sql, [user_id], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results });
        }
      });
    });
  }

  hasDevice(device_token, user_id) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM devices WHERE device_token = ? AND user_id = ?";
      db.query(sql, [device_token, user_id], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          if (results.length === 0) {
            resolve(false);
          }
          resolve(true);
        }
      });
    });
  }

  addDevice(data) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO devices VALUES (NULL, ?, ?, ?)";
      db.query(
        sql,
        [data.device_token, data.user_id, data.type],
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

  deleteDevice(device_token, user_id) {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM devices WHERE device_token = ? AND user_id = ?";
      db.query(sql, [device_token, user_id], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results[0] });
        }
      });
    });
  }
}

module.exports = new DeviceModel();
