import * as aws from "aws-sdk";
import multer = require("multer");
import * as multerS3 from "multer-s3";
import "dotenv/config";

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION,
});

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "dorun-image",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, "images/" + Date.now() + "." + file.originalname.split(".").pop()); // 이름 설정
    },
  }),
});
