const db = require("../../config/db");
const limit = 10;

class ProductModel {
  getHotProduct() {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT * FROM product WHERE 1 - (dislike / `like`) > 0.8 ORDER BY (`like` / dislike) DESC LIMIT ?";
      db.query(sql, [limit], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  getMoreHotProduct(page) {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      let sql =
        "SELECT * FROM product WHERE 1 - (dislike / `like`) > 0.8 ORDER BY (`like` / dislike) DESC LIMIT ?, ?";
      db.query(sql, [offset, limit], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  filterNewProductHot(page) {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      let sql =
        "SELECT * FROM product WHERE 1 - (dislike / `like`) > 0.8 AND new = 1 ORDER BY (`like` / dislike) DESC LIMIT ?, ?";
      db.query(sql, [offset, limit], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  filterSaleProductHot(page) {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      let sql =
        "SELECT * FROM product WHERE 1 - (dislike / `like`) > 0.8 AND sale = 1 ORDER BY (`like` / dislike) DESC LIMIT ?, ?";
      db.query(sql, [offset, limit], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  getProductByCategory(category_id, page) {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      let sql = "SELECT * FROM product WHERE category_id = ? LIMIT ?, ?";
      db.query(sql, [category_id, offset, limit], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  getProductHint() {
    return new Promise((resolve, reject) => {
      let sql = "select product.* from product order by RAND() limit 20";
      db.query(sql, (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  filterNewProductByCategory(category_id, page) {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      let sql =
        "SELECT * FROM product WHERE category_id = ? AND new = 1 LIMIT ?, ?";
      db.query(sql, [category_id, offset, limit], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  searchProductByName(product_name, page) {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      let sql = `SELECT * FROM product WHERE name LIKE '%${product_name}%' LIMIT ?, ?`;
      db.query(sql, [offset, limit], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  searchProductNew(page) {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      let sql = "SELECT * FROM product WHERE new = 1 LIMIT ?, ?";
      db.query(sql, [offset, limit], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  searchProductSale(page) {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      let sql = "SELECT * FROM product WHERE sale = 1 LIMIT ?, ?";
      db.query(sql, [offset, limit], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  searchProductHot(page) {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      let sql =
        "SELECT * FROM product WHERE 1 - (dislike / `like`) > 0.9 ORDER BY (`like` / dislike) DESC LIMIT ?, ?";
      db.query(sql, [offset, limit], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  filterSaleProductByCategory(category_id, page) {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      let sql =
        "SELECT * FROM product WHERE category_id = ? AND sale = 1 LIMIT ?, ?";
      db.query(sql, [category_id, offset, limit], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  getSubImageProduct(product_id) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT image FROM product_image WHERE product_id = ?";
      db.query(sql, [product_id], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  getDetailProduct(product_id) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM product WHERE id = ?";
      db.query(sql, [product_id], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results[0] });
        }
      });
    });
  }

  getFavoriteProduct(uid, page) {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      let sql =
        "SELECT product.* FROM product,user_favourite_product,`user` WHERE product.id = user_favourite_product.product_id AND `user`.id = user_favourite_product.user_id AND `user`.id = ? GROUP BY product.id LIMIT ?, ?";
      db.query(sql, [uid, offset, limit], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  checkItemFavorite(uid, product_id) {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT * FROM user_favourite_product WHERE user_id = ? AND product_id = ?";
      db.query(sql, [uid, product_id], (error, results) => {
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

  postFavoriteProduct(uid, product_id) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO user_favourite_product VALUES (NULL, ?, ?)";
      db.query(sql, [uid, product_id], (error, results) => {
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

  deleteFavoriteProduct(uid, product_id) {
    return new Promise((resolve, reject) => {
      const sql =
        "DELETE FROM user_favourite_product WHERE user_id = ? AND product_id = ?";
      db.query(sql, [uid, product_id], (error, results) => {
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
}

module.exports = new ProductModel();
