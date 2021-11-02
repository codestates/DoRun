import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "../ormconfig";
import * as express from "express";
import "dotenv/config";
import router from "./routes";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import { User } from "./entity/User";

// ////////////////////////////
// import * as aws from "aws-sdk";
// import multer = require("multer");
// //import multerS3 = require("multer-s3");
// import * as multerS3 from "multer-s3";
// import path = require("path");

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
  })
);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
//   },
//   filename(req, file, cb) {
//     const ext = path.extname(file.originalname);
//     console.log("file.originalname", file.originalname);
//     cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//   },
// });
// const upload = multer({ storage: storage });

// app.post("/img", upload.single("image"), (req: express.Request, res: express.Response) => {
//   res.send("hello post");
// });

app.use("/", router);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello");
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listen Port = ${process.env.SERVER_PORT}`);
});
