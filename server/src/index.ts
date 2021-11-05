import "reflect-metadata";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import { createConnection } from "typeorm";
import config from "../ormconfig";
import router from "./routes";
import "dotenv/config";

const app = express();
//const port: any = process.env.SERVER_PORT;
//const port: any = 3000;

// server.listen(port, () => {
//   console.log("Server listening at port %d", port);
// });
// //////

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
    origin: "*",
    credentials: true,
    //origin: true,

    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.use("/", router);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello");
});

// const server = require("http").createServer(app);
// const io = require("socket.io")(server);

// server.listen(process.env.SERVER_PORT, () => {
//   console.log(`listen Port = ${process.env.SERVER_PORT}`);
// });

const server = require("./soket");
app.listen(process.env.SERVER_PORT, () => {
  console.log(`listen Port = ${process.env.SERVER_PORT}`);
});

server.listen(4000, () => {
  console.log(`Chating Port = 4000`);
});

export default app;
