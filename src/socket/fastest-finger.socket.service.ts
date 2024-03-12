/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Socket } from "socket.io";
import FastestFingerModel from "../app/fastest-finger/fastest-finger.schema";
import { FastestFingerService } from "../app/fastest-finger/fastest-finger.service";

const activeUsers: any = {};
const userListsByRoom: any = {};
const fastestFingerService = new FastestFingerService();
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const FastestFingerSocketService = (io: any, socket: Socket) => {
  socket.on("join_fastest_finger_room", (data) => {
    const roomId = data.roomId;
    const questionId = data.questionId;
    const compoundKey = roomId + "-" + questionId; // Creating a compound key

    void socket.join(compoundKey);
    console.log(
      `Socket ${data.username} joined room for fastest finger round ${compoundKey}`
    );

    // Check if the room exists in the user list
    if (!userListsByRoom[compoundKey]) {
      userListsByRoom[compoundKey] = [];
    }

    // Check if the room is full (limit to 2 users)
    if (userListsByRoom[compoundKey].length >= 2) {
      // Emit an event to inform the client that the room is full
      socket.emit("room_full", { roomId, questionId });
      return; // Stop execution
    }

    // Check if the username is not already in the user list for the room
    if (!userListsByRoom[compoundKey].includes(data.username)) {
      // Add the username to the user list for the room
      userListsByRoom[compoundKey].push(data.username);
    }

    activeUsers[compoundKey] = (activeUsers[compoundKey] || 0) + 1;

    io.to(compoundKey).emit("active_join_fastest_finger_count", {
      roomId,
      questionId,
      usersLists: userListsByRoom[compoundKey],
      users: activeUsers,
      count: activeUsers[compoundKey],
    });
  });

  socket.on("send_fastest_finger_data", (data) => {
    console.log(data);
    const result = fastestFingerService.verifyAnswer(data.code, data.answer);
    io.to(data.roomId).emit("receive_fastest_finger_data", {
      timer: data.timer,
      username: data.username,
      result,
      senderId: socket.id,
    });
  });
};
