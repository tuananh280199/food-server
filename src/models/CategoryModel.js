const db = require("../../config/db");

class CategoryModel {
  getAllCategory() {
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

  //admin
  addCategory(data) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO category VALUES (NULL, ?, ?)";
      db.query(sql, [data.name, data.image], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results });
        }
      });
    });
  }

  updateCategory(data, categoryId) {
    return new Promise((resolve, reject) => {
      let sql = "UPDATE category SET name = ? , image = ? WHERE id = ?";
      db.query(sql, [data.name, data.image, categoryId], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results[0] });
        }
      });
    });
  }

  deleteCategory(categoryId) {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM category WHERE id = ?";
      db.query(sql, [categoryId], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results[0] });
        }
      });
    });
  }

  getCategory(category_id) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM category WHERE id = ?";
      db.query(sql, [category_id], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results[0] });
        }
      });
    });
  }
}

module.exports = new CategoryModel();
