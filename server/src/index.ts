import "reflect-metadata";
import "dotenv/config";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as cors from "cors";
import { SchedulerCrewDelete } from "./utils/scheduler";
import { createConnection } from "typeorm";
import { socketInit } from "./soket";
import config from "../ormconfig";
import router from "./routes";
import * as http from "http";

const app = express();

createConnection(config)
  .then(() => {
    console.log("DB CONNECTION!");
  })
  .catch((error) => {
    console.log(error);
  });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["https://dorunapp.com", "http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.use("/", router);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send(`hello`);
});

const server = http.createServer(app);

server.listen(process.env.SERVER_PORT, () => {
  console.log(`listen Port = ${process.env.SERVER_PORT}`);
});
console.log(process.env.NODE_APP_INSTANCE);
if (process.env.NODE_APP_INSTANCE === "0") {
  SchedulerCrewDelete();
}

socketInit(server);
