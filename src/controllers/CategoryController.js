const categoryModel = require("../models/CategoryModel");

class CategoryController {
  //get category
  async getAllCategory(req, res) {
    try {
      const data = await categoryModel.getAllCategory();
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
  async addCategory(req, res) {
    try {
      const addData = req.body.data;
      const data = await categoryModel.addCategory(addData);
      return res.status(201).send({
        data: data.results,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async updateCategory(req, res) {
    try {
      const categoryId = req.params.category_id;
      const addData = req.body.data;
      const data = await categoryModel.updateCategory(addData, categoryId);
      return res.status(201).send({
        data: data.results,
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async deleteCategory(req, res) {
    try {
      const categoryId = req.params.category_id;
      await categoryModel.deleteCategory(categoryId);
      return res.status(200).send({
        message: "Xoá Thành Công",
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  async getCategory(req, res) {
    try {
      const categoryId = req.params.category_id;
      const data = await categoryModel.getCategory(categoryId);
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
