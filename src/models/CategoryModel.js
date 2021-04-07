const db = require("../../config/db");

class CategoryModel {
  getCategory() {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM category";
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

module.exports = new CategoryModel();
