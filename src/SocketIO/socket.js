const { ADD_DEVICE, UPDATE_STATUS, SERVER_SEND_STATUS } = require("./constants");
const deviceModel = require("../models/DeviceModel");

const SocketServer = (app, port) => {
  const httpServer = require("http").Server(app);
  const io = require("socket.io")(httpServer);

  io.on("connection", (socket) => {
    // console.log("co connnection: ", socket.id);

    socket.on(ADD_DEVICE, async (data) => {
      // console.log("ADD_DEVICE: ", data);
      socket.join(data.user_id);
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

    socket.on(UPDATE_STATUS, (data) => {
      // console.log("UPDATE_STATUS: ", data);
      socket.join(data.user_id);
      socket.to(data.user_id).emit(SERVER_SEND_STATUS, data);
    })
  });

  httpServer.listen(port);
};

module.exports = SocketServer;
