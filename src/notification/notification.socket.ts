import { type Socket } from "socket.io";

export const NotificationSocketService = (io: any, socket: Socket): any => {
  socket.on("send_notification", (data) => {
    console.log("hi");
    io.to(data.roomId).emit("receive_notification", {
      notification: "testing notifications",
    });
  });
};
