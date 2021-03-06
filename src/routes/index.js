const usersRoute = require("./user");
const uploadRoute = require("./upload");
const authRoute = require("./auth");
const productRoute = require("./product");
const categoryRoute = require("./category");
const orderRoute = require("./order");
const deviceRoute = require("./device");

function route(app) {
  app.use("/api/auth", authRoute);
  app.use("/api/users", usersRoute);
  app.use("/api/files", uploadRoute);
  app.use("/api/product", productRoute);
  app.use("/api/category", categoryRoute);
  app.use("/api/order", orderRoute);
  app.use("/api/device", deviceRoute);
}

module.exports = route;
