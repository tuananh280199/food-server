const productModel = require("../models/ProductModel");
const categoryModel = require("../models/CategoryModel");

class ProductController {
  //get hot product
  async getHotProduct(req, res) {
    try {
      const data = await productModel.getHotProduct();
      return res.status(200).send({
        data: data.results,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async getMoreHotProduct(req, res) {
    try {
      let page = 1;
      if (req.query.page) page = req.query.page;
      const data = await productModel.getMoreHotProduct(page);
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

  async getHintProduct(req, res) {
    try {
      const data = await productModel.getProductHint();
      return res.status(200).send({
        data: data.results,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async filterNewProductHot(req, res) {
    try {
      let page = 1;
      if (req.query.page) page = req.query.page;
      const data = await productModel.filterNewProductHot(page);
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

  async filterSaleProductHot(req, res) {
    try {
      let page = 1;
      if (req.query.page) page = req.query.page;
      const data = await productModel.filterSaleProductHot(page);
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

  async filterNewProductByCategory(req, res) {
    try {
      let page = 1;
      if (req.query.page) page = req.query.page;
      const cate_id = req.params.category_id;
      const data = await productModel.filterNewProductByCategory(cate_id, page);
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

  async filterSaleProductByCategory(req, res) {
    try {
      let page = 1;
      if (req.query.page) page = req.query.page;
      const cate_id = req.params.category_id;
      const data = await productModel.filterSaleProductByCategory(
        cate_id,
        page
      );
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

  async getProductByCategory(req, res) {
    try {
      let page = 1;
      if (req.query.page) page = req.query.page;
      const cate_id = req.params.category_id;
      const data = await productModel.getProductByCategory(cate_id, page);
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

  async searchProductByName(req, res) {
    try {
      let page = 1;
      if (req.query.page) page = req.query.page;
      const product_name = req.query.product_name;
      const data = await productModel.searchProductByName(product_name, page);
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

  async searchProductByPrice(req, res) {
    try {
      let page = 1;
      if (req.query.page) page = req.query.page;
      const maxPrice = req.query.max_price;
      const data = await productModel.searchProductByPrice(maxPrice, page);
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

  async searchProductNew(req, res) {
    try {
      let page = 1;
      if (req.query.page) page = req.query.page;
      const data = await productModel.searchProductNew(page);
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

  async searchProductSale(req, res) {
    try {
      let page = 1;
      if (req.query.page) page = req.query.page;
      const data = await productModel.searchProductSale(page);
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

  async searchProductHot(req, res) {
    try {
      let page = 1;
      if (req.query.page) page = req.query.page;
      const data = await productModel.searchProductHot(page);
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

  async getDetailProduct(req, res) {
    try {
      const product_id = req.params.id;
      const data = await productModel.getDetailProduct(product_id);
      const subImage = await productModel.getSubImageProduct(product_id);
      return res.status(200).send({
        data: {
          ...data.results,
          photos: subImage.results,
        },
      });
    } catch (error) {
      return res.status(500).send({
        message: error,
      });
    }
  }

  async getFavoriteProduct(req, res) {
    try {
      let page = 1;
      if (req.query.page) page = req.query.page;
      const uid = req.params.user_id;
      const data = await productModel.getFavoriteProduct(uid, page);
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

  async postFavoriteProduct(req, res) {
    try {
      const uid = req.body.user_id;
      const product_id = req.body.product_id;
      const checkItem = await productModel.checkItemFavorite(uid, product_id);
      if (checkItem) {
        return res.status(400).send({
          message: "B???n ???? Y??u Th??ch S???n Ph???m N??y",
        });
      }
      const data = await productModel.postFavoriteProduct(uid, product_id);
      if (data.results) {
        const product = await productModel.getDetailProduct(product_id);
        return res.status(201).send({
          message: "Th??m Th??nh C??ng",
          data: product.results,
        });
      }
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async deleteFavoriteProduct(req, res) {
    try {
      const uid = req.params.user_id;
      const product_id = req.params.product_id;
      const data = await productModel.deleteFavoriteProduct(uid, product_id);
      if (data.results) {
        return res.status(200).send({
          message: "Xo?? Th??nh C??ng",
        });
      }
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async countFavoriteProduct(req, res) {
    try {
      const uid = req.params.user_id;
      const data = await productModel.countFavoriteProduct(uid);
      return res.status(200).send({
        data: data.results,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  //admin

  async getAllProduct(req, res) {
    try {
      let page = 1;
      if (req.query.page) page = req.query.page;
      const data = await productModel.getAllProduct(page);
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

  async addProduct(req, res) {
    try {
      const addData = req.body.data;
      const data = await productModel.addProduct(addData);
      return res.status(201).send({
        data: data.results,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const productId = req.params.product_id;
      const addData = req.body.data;
      const data = await productModel.updateProduct(addData, productId);
      return res.status(201).send({
        data: data.results,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const product_id = req.params.product_id;
      await productModel.deleteProduct(product_id);
      return res.status(200).send({
        message: "Xo?? Th??nh C??ng",
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async addSubImage(req, res) {
    try {
      const product_id = req.params.product_id;
      const images = req.body.data;
      const data = await productModel.addSubImage(images, product_id);
      return res.status(201).send({
        data: data.results,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async deleteSubImage(req, res) {
    try {
      const product_id = req.params.product_id;
      await productModel.deleteSubImage(product_id);
      return res.status(200).send({
        message: "Xo?? Th??nh C??ng",
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }
}

module.exports = new ProductController();
