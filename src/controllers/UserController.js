const userModel = require("../models/UserModel");
const validate = require("../../utils/validate");
const configPath = require("../../utils/configPath");

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
      if (req.file) {
        const id = Number(req.params.id);
        let image = req.file.path;
        image = configPath(image);
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
      }
    } catch (error) {
      return res.status(500).send({
        message: e,
      });
    }
  }
}

module.exports = new UserController();
