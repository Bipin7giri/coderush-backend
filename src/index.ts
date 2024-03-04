import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import RouteRouter from "./api/api";
import cors from "cors";
// import { connectDb } from "./src/config/database.connection";
// import { startCronJob } from "./src/cron-jobs/cron-job";
import { AppDataSource } from "./config/database.config";

// import { ScrapAll } from "./scrap";

// AppDataSource.initialize()
//   .then(async () => {
// const brokerService  = new BrokerService();
// await brokerService.createMany()
// const companyService = new CompanyService()
// await companyService.createMany()
// void ScrapAll();
// const notificationService = new NotificationService();
// await notificationService.sendNotification();
const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(8000, () => {
  console.log("server listening on port" + 8000);
});
// console.log("connected to Database");
// })
// .catch((error) => {
//   console.log(error);
// });
