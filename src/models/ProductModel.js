const db = require("../../config/db");
const limit = 10;

class ProductModel {
  //client
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
      let sql =
        "select product.* from product WHERE out_of_product != 1 order by RAND() limit 20";
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
      let sql = "SELECT id, image FROM product_image WHERE product_id = ?";
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

  countFavoriteProduct(uid) {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT COUNT(id) as numberFavorite FROM `user_favourite_product` WHERE `user_favourite_product`.user_id = ?";
      db.query(sql, [uid], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results[0] });
        }
      });
    });
  }

  //admin

  getAllProduct(page) {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      let sql = "SELECT * FROM product ORDER BY product.id DESC LIMIT ?, ?";
      db.query(sql, [offset, limit], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results });
        }
      });
    });
  }

  //id, name price priceSale new sale image like dislike origin unit quantitative ingredient note description category_id out_of_product
  addProduct(data) {
    return new Promise((resolve, reject) => {
      let sql =
        "INSERT INTO product VALUES (NULL, ?, ?, ?, ?, ?, ?, 0, 0, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(
        sql,
        [
          data.name,
          data.price,
          data.priceSale,
          data.new,
          data.sale,
          data.image,
          data.origin,
          data.unit,
          data.quantitative,
          data.ingredient,
          data.note,
          data.description,
          data.category_id,
          data.out_of_product,
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

  updateProduct(data, idProduct) {
    return new Promise((resolve, reject) => {
      let sql =
        "UPDATE product SET name = ?, price = ?, priceSale = ?, new = ?, sale = ?, image = ?, origin = ?, unit = ?, quantitative = ?, ingredient = ?, note = ?, description = ?, category_id = ?, out_of_product = ? WHERE product.id = ?";
      db.query(
        sql,
        [
          data.name,
          data.price,
          data.priceSale,
          data.new,
          data.sale,
          data.image,
          data.origin,
          data.unit,
          data.quantitative,
          data.ingredient,
          data.note,
          data.description,
          data.category_id,
          data.out_of_product,
          idProduct,
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

  deleteProduct(productId) {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM product WHERE id = ?";
      db.query(sql, [productId], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results[0] });
        }
      });
    });
  }

  addSubImage(images, product_id) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < images.length; i++) {
        const sql = "INSERT INTO product_image VALUES (NULL, ?, ?)";
        db.query(sql, [images[i], product_id], (error, results) => {
          if (error) {
            reject({ error });
          }
        });
      }
      resolve({ results: "success" });
    });
  }

  deleteSubImage(product_id) {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM product_image WHERE product_id = ?";
      db.query(sql, [product_id], (error, results) => {
        if (error) {
          reject({ error });
        } else {
          resolve({ results: results[0] });
        }
      });
    });
  }
}

module.exports = new ProductModel();
