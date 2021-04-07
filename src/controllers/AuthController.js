const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const saltRounds = 10;

function generateAcceptToken(user) {
  return jwt.sign({ user }, process.env.TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "12h",
  });
}

class AuthController {
  //login
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await userModel.findUserByUserName(username);
      if (!user.results) {
        return res.status(404).send({
          message: "Tài Khoản Không Tồn Tại",
        });
      } else {
        let comparePassword = bcrypt.compareSync(
          password,
          user.results.password
        );
        if (!comparePassword) {
          return res.status(401).send({
            message: "Sai Mật Khẩu",
          });
        } else {
          const userToken = {
            id: user.results.id,
            name: user.results.name,
            nickname: user.results.nickname,
            phone: user.results.phone,
            address: user.results.address,
            email: user.results.email,
            avatar: user.results.avatar,
          };
          const accessToken = generateAcceptToken(userToken);
          return res.status(200).send({
            message: "Đăng Nhập Thành Công",
            access_token: accessToken,
            profile: userToken,
          });
        }
      }
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  //register
  async register(req, res) {
    try {
      const body = req.body;
      if (!body.username || !body.password) {
        return res.status(400).send({
          message: "Bad Request",
        });
      }
      //check username exist
      const hasUser = await userModel.findUserByUserName(body.username);
      if (hasUser.results) {
        return res.status(400).send({
          message: "Tài Khoản Đã Tồn Tại",
        });
      }
      //success
      body.password = bcrypt.hashSync(body.password, saltRounds);
      let user = await userModel.create(body);
      if (user.results) {
        return res.status(201).send({
          message: "Đăng Ký Thành Công",
        });
      }
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }

  //logout
  async logout(req, res) {}

  //reset-password
  async resetPassword(req, res) {
    try {
      const id = req.params.id;
      let { passwordOld, passwordNew } = req.body;
      const findUser = await userModel.findUserById(id);
      let comparePassword = bcrypt.compareSync(
        passwordOld,
        findUser.results.password
      );
      if (!comparePassword) {
        return res.status(401).send({
          message: "Sai Mật Khẩu Cũ",
        });
      }
      passwordNew = bcrypt.hashSync(passwordNew, saltRounds);
      let user = await userModel.changePassword(passwordNew, id);
      if (user.error) {
        return res.status(500).send({
          message: "Error Server",
        });
      } else {
        return res.status(201).send({
          message: "Thay Mật Khẩu Thành Công",
        });
      }
    } catch (error) {
      return res.status(500).send({
        message: e,
      });
    }
  }
  //forgot-password
  async forgotPassword(req, res) {}
}

module.exports = new AuthController();
