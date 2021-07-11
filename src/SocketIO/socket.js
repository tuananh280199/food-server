const { ADD_DEVICE } = require("./constants");
const deviceModel = require("../models/DeviceModel");

const SocketServer = (app, port) => {
  const httpServer = require("http").Server(app);
  const io = require("socket.io")(httpServer);

  io.on("connection", (socket) => {
    // console.log("co connnection: ", socket.id);

    socket.on(ADD_DEVICE, async (data) => {
      // console.log("ADD_DEVICE: ", data);
      try {
        const hasDevice = await deviceModel.hasDevice(
          data.device_token,
          data.user_id
        );
        if (hasDevice) return data;
        return deviceModel.addDevice(data);
      } catch (error) {
        throw e;
      }
    });
  });

  httpServer.listen(port);
};

module.exports = SocketServer;
