const express = require("express");
const route = express.Router();

const productController = require("../controllers/ProductController");
const verifyToken = require("../middlewares/verifyToken");

route.get("/get-hot-product", productController.getHotProduct);
route.get("/get-more-hot-product", productController.getMoreHotProduct);
route.get("/get-more-hot-product/new", productController.filterNewProductHot);
route.get("/get-more-hot-product/sale", productController.filterSaleProductHot);
route.get("/get-hint-product", productController.getHintProduct);
route.get(
  "/get-product-by-category/:category_id",
  productController.getProductByCategory
);
route.get(
  "/get-product-by-category/:category_id/new",
  productController.filterNewProductByCategory
);
route.get(
  "/get-product-by-category/:category_id/sale",
  productController.filterSaleProductByCategory
);
route.get("/search-by-name", productController.searchProductByName);
route.get("/search-product-new", productController.searchProductNew);
route.get("/search-product-sale", productController.searchProductSale);
route.get("/search-product-hot", productController.searchProductHot);
route.get("/get-detail-product/:id", productController.getDetailProduct);
route.get(
  "/favorite-product/:user_id",
  [verifyToken],
  productController.getFavoriteProduct
);
route.post(
  "/favorite-product",
  [verifyToken],
  productController.postFavoriteProduct
);
route.delete(
  "/favorite-product/:user_id/:product_id",
  [verifyToken],
  productController.deleteFavoriteProduct
);
route.get(
  "/count-favorite-product/:user_id",
  verifyToken,
  productController.countFavoriteProduct
);

module.exports = route;
