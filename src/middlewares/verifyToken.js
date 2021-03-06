const jwt = require("jsonwebtoken");
require("dotenv");

//middleware check login
const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    String(req.headers.authorization.split(" ")[0]).toLowerCase() === "bearer"
  ) {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(403).send({
            name: "TokenExpiredError",
            message: "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại",
          });
        }
        return res.status(403).send(err);
      } else {
        return next();
      }
    });
  } else {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }
};

module.exports = verifyToken;
