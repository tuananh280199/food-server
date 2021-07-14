const db = require("../../config/db");
const limit = 10;

class UserModel {
  findUserByUserName(username) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM user where username = ?";
      db.query(sql, [username], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results[0] });
        }
      });
    });
  }

  findUserById(id) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM user where id = ?";
      db.query(sql, [id], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results[0] });
        }
      });
    });
  }

  has(id) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM user WHERE id = ?";
      db.query(sql, [id], (error, results) => {
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

  create(data) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO user VALUES (NULL, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)";
      db.query(sql, [data.username, data.password], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({
            results,
          });
        }
      });
    });
  }

  updateInfo(data, id) {
    return new Promise((resolve, reject) => {
      let sql =
        "UPDATE user SET name = ?, nickname = ?, phone = ?, address = ?, email = ? WHERE id = ?";
      db.query(
        sql,
        [data.name, data.nickname, data.phone, data.address, data.email, id],
        (error, results) => {
          if (error) {
            reject({ error });
          } else {
            const newUser = {
              id: id,
              name: data.name,
              nickname: data.nickname,
              phone: data.phone,
              address: data.address,
              email: data.email,
            };
            resolve({
              results: newUser,
            });
          }
        }
      );
    });
  }

  changePassword(password, id) {
    return new Promise((resolve, reject) => {
      let sql = "UPDATE user SET password = ? WHERE id = ?";
      db.query(sql, [password, id], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results });
        }
      });
    });
  }

  updateAvatar(id, image) {
    return new Promise((resolve, reject) => {
      let sql = "UPDATE user SET avatar = ? WHERE id = ?";
      db.query(sql, [image, id], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          db.query(
            "SELECT * FROM user WHERE id = ?",
            [id],
            (error, results) => {
              if (error) {
                reject({ error });
              } else {
                resolve({ results: results[0] });
              }
            }
          );
        }
      });
    });
  }

  //admin
  getUser(page) {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      let sql = "SELECT * FROM user ORDER BY user.id DESC LIMIT ?, ?";
      db.query(sql, [offset, limit], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  searchUserByName(user_name, page) {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      let sql = `SELECT * FROM user WHERE name LIKE '%${user_name}%' LIMIT ?, ?`;
      db.query(sql, [offset, limit], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  updateRole(role, user_id) {
    return new Promise((resolve, reject) => {
      let sql = "UPDATE user SET role = ? WHERE id = ?";
      db.query(sql, [role, user_id], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results[0] });
        }
      });
    });
  }

  deleteUser(user_id) {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM user WHERE id = ?";
      db.query(sql, [user_id], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results[0] });
        }
      });
    });
  }
}

module.exports = new UserModel();
