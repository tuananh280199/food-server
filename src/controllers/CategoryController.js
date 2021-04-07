const categoryModel = require("../models/CategoryModel");

class CategoryController {
  //get category
  async getCategory(req, res) {
    try {
      const data = await categoryModel.getCategory();
      return res.status(200).send({
        data: data.results,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }
}

module.exports = new CategoryController();
