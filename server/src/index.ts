import "reflect-metadata";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import { createConnection } from "typeorm";
import config from "../ormconfig";
import router from "./routes";
import "dotenv/config";
import { socketInit } from "./soket";

const app = express();
const http = require("http");

createConnection(config)
  .then(() => {
    console.log("DB CONNECTION!", process.env.NODE_ENV);
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
    origin: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.use("/", router);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello");
});

const server = http.createServer(app);
//import { Server } from "socket.io";

server.listen(process.env.SERVER_PORT, () => {
  console.log(`listen Port = ${process.env.SERVER_PORT}`);
});

socketInit(server);
