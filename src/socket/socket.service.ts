import express, { Express } from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import AppService from "../app/app.service";
export const socketService = (app: Express) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const activeUsers: any = {};
  let userListsByRoom: any = {};
  const appService = new AppService();

  io.on("connection", (socket) => {
    console.log(`a user connected ${socket.id}`);

    socket.on("join_room", (data) => {
      socket.join(data.roomId);
      console.log(`Socket ${socket.id} joined room ${data.roomId}`);

      if (!userListsByRoom[data.roomId]) {
        userListsByRoom[data.roomId] = [];
      }

      // Check if the username is not already in the user list for the room
      if (!userListsByRoom[data.roomId].includes(data.username)) {
        // Add the username to the user list for the room
        userListsByRoom[data.roomId].push(data.username);
      }

      // Increment the active user count for the room
      activeUsers[data.roomId] = (activeUsers[data.roomId] || 0) + 1;

      // Send the updated active user count back to the users in the same room
      io.to(data.roomId).emit("active_users_count", {
        roomId: data.roomId,
        usersLists: userListsByRoom?.[data.roomId],
        users: activeUsers,
        count: activeUsers[data.roomId],
      });
    });

    socket.on("send_message", (data) => {
      console.log(data);
      const result = appService.executeNodeCodeSync(data.message);
      console.log(result);
      // Emit the message to everyone in the room associated with the message
      io.to(data.roomId).emit("receive_message", {
        message: result,
        username: data.username,
        senderId: socket.id,
      });
    });

    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);

      // Decrease the active user count for the room when a user disconnects
      Object.keys(activeUsers).forEach((roomId) => {
        if (socket.rooms.has(roomId)) {
          activeUsers[roomId] = Math.max(0, activeUsers[roomId] - 1);
          console.log(activeUsers);

          // Send the updated active user count back to the frontend
          io.emit("active_users_count", {
            roomId,
            count: activeUsers[roomId],
          });
        }
      });
    });
  });
};
