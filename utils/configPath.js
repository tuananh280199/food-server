require("dotenv").config();
const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_POST;

const configPath = (path) => {
  // console.log(path);
  return `http://${HOST}:${PORT}/${path}`;
};

module.exports = configPath;
