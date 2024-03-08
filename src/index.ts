import express, { type Request, type Response } from "express";
import RouteRouter from "./api/api";
import { socketService } from "./socket/socket.service";
import { databaseInit } from "./database/database.connection";

databaseInit();
const app = express();
socketService(app);
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "server is running fine",
    endpoint: {
      company: {
        get: "/api/v1/",
      },
    },
  });
});
app.use("/api/v1", RouteRouter);

app.listen(8000, () => {
  console.log("server listening on port " + 8000);
});
console.log("connected to Database");
