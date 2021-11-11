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
  res.send(
    `${
      (process.env.SERVER_PORT,
      process.env.DATABASE_USER,
      process.env.DATABASE_PASSWORD,
      process.env.DATABASE_PORT,
      process.env.DATABASE_HOST,
      process.env.DATABASE_NAME,
      process.env.NODE_ENV,
      process.env.KAKAO_CLIENT_ID,
      process.env.SERVER_PORT,
      process.env.ACCESS_SECRET,
      process.env.REFRESH_SECRET,
      process.env.S3_ACCESS_KEY,
      process.env.S3_SECRET_KEY,
      process.env.S3_REGION,
      process.env.REDIS_HOST,
      process.env.REDIS_PORT,
      process.env.REDIS_PASSWORD)
    }`
  );
});

const server = http.createServer(app);
//import { Server } from "socket.io";

server.listen(process.env.SERVER_PORT, () => {
  console.log(`listen Port = ${
    (process.env.SERVER_PORT,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    process.env.DATABASE_PORT,
    process.env.DATABASE_HOST,
    process.env.DATABASE_NAME,
    process.env.NODE_ENV,
    process.env.KAKAO_CLIENT_ID,
    process.env.SERVER_PORT,
    process.env.ACCESS_SECRET,
    process.env.REFRESH_SECRET,
    process.env.S3_ACCESS_KEY,
    process.env.S3_SECRET_KEY,
    process.env.S3_REGION,
    process.env.REDIS_HOST,
    process.env.REDIS_PORT,
    process.env.REDIS_PASSWORD)
  }
   `);
});

socketInit(server);
