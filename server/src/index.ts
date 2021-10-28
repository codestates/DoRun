
  
import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "../ormconfig";
import * as express from "express";
import "dotenv/config";
import router from "./routes";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import { User } from "./entity/User";

const app = express();

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
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

app.use("/", router);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello");
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listen Port = ${process.env.SERVER_PORT}`);
});