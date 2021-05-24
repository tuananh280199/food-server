const userModel = require("../models/UserModel");
const validate = require("../../utils/validate");

class UserController {
  //update user
  async updateUser(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const findUser = await userModel.has(id);
      if (!findUser) {
        return res.status(404).send({
          message: "Không Tìm Thấy Người Dùng Để Cập Nhật",
        });
      } else {
        let user = await userModel.updateInfo(body, id);
        if (user.results) {
          return res.status(201).send({
            message: "Cập Nhật Thành Công",
            data: user.results,
          });
        }
      }
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  //upload avatar
  async updateAvatar(req, res) {
    try {
      // if (req.file) {
      const id = Number(req.params.id);
      // let image = req.file.path;
      const image = req.body.url;
      const user = await userModel.updateAvatar(id, image);
      if (user.results) {
        const newUser = {
          id: user.results.id,
          name: user.results.name,
          nickname: user.results.nickname,
          phone: user.results.phone,
          address: user.results.address,
          email: user.results.email,
          avatar: user.results.avatar,
        };
        return res.status(201).send({
          message: "Cập Nhật Thành Công",
          data: newUser,
        });
      }
      // }
    } catch (error) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  //admin

  async getUser(req, res) {
    try {
      let page = 1;
      if (req.query.page) page = req.query.page;
      const data = await userModel.getUser(page);
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

  async searchUserByName(req, res) {
    try {
      let page = 1;
      if (req.query.page) page = req.query.page;
      const user_name = req.query.user_name;
      const data = await userModel.searchUserByName(user_name, page);
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

  async updateRole(req, res) {
    try {
      const userId = req.params.user_id;
      const role = req.body.role;
      const data = await userModel.updateRole(role, userId);
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
      const userId = req.params.user_id;
      await userModel.deleteUser(userId);
      return res.status(200).send({
        message: "Xoá Thành Công",
      });
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }
}

module.exports = new UserController();
