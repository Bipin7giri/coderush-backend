import { Socket } from "socket.io";

const activeUsers: any = {};
const userListsByRoom: any = {};

export const FastestFingerSocketService = (io: any, socket: Socket) => {
  socket.on("join_fastet_finger_room", (data) => {
    const roomId = data.roomId;
    void socket.join(roomId);
    console.log(
      `Socket ${data.username} joined room for fastest finger round ${roomId}`,
    );

    // Check if the room exists in the user list
    if (!userListsByRoom[roomId]) {
      userListsByRoom[roomId] = [];
    }

    // Check if the room is full (limit to 2 users)
    if (userListsByRoom[roomId].length >= 2) {
      // Emit an event to inform the client that the room is full
      socket.emit("room_full", { roomId });
      return; // Stop execution
    }

    // Check if the username is not already in the user list for the room
    if (!userListsByRoom[roomId].includes(data.username)) {
      // Add the username to the user list for the room
      userListsByRoom[roomId].push(data.username);
    }

    activeUsers[roomId] = (activeUsers[roomId] || 0) + 1;

    io.to(roomId).emit("active_join_fastest_finger_count", {
      roomId: roomId,
      usersLists: userListsByRoom[roomId],
      users: activeUsers,
      count: activeUsers[roomId],
    });
  });
};
