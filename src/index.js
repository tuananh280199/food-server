const express = require("express");
const app = express();
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

app.use("/public/images", express.static("public/images"));

//route
let routes = require("./routes");
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);

console.log("RESTful API server started on: " + port);
