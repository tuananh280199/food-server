const express = require("express");
const app = express();
const SocketServer = require("./SocketIO/socket");
var admin = require("firebase-admin");
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
//middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  express.json({
    type: "application/json",
  })
);

var serviceAccount = require("../foodapplication-b57ab-firebase-adminsdk-694ey-27b8634662.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use("/public/images", express.static("public/images"));

//route
let routes = require("./routes");
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

SocketServer(app, port);

console.log("RESTful API server started on: " + port);
