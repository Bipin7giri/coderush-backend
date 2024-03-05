import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import RouteRouter from "./api/api";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import AppService from "./app/app.service";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const activeUsers: any = {};
const appService = new AppService();
io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);

    // Increment the active user count for the room
    activeUsers[roomId] = (activeUsers[roomId] || 0) + 1;
    // Send the updated active user count back to the frontend
    io.emit("active_users_count", {
      roomId,
      users: activeUsers,
      count: activeUsers[roomId],
    });
  });

  socket.on("send_message", (data) => {
    const result = appService.executeNodeCodeSync(data);
    console.log(result);
    // Emit the message to everyone in the room associated with the message
    io.emit("receive_message", {
      message: result,
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
// startCronJob();
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "server is running fine",
    endpoint: {
      company: {
        get: "/api/v1/company",
      },
    },
  });
});
app.use("/api/v1", RouteRouter);

server.listen(8000, () => {
  console.log("server listening on port" + 8000);
});
// console.log("connected to Database");
// })
// .catch((error) => {
//   console.log(error);
// });
