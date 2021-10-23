"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var app = (0, express_1.default)();
app.get("/", function (req, res) {
    res.send("H, host = " + process.env.DATABASE_HOST + "\n\n  DBuser = " + process.env.DATABASE_USER + "\n\n  DBpassword = " + process.env.DATABASE_PASSWORD + "\n\n  DBPort = " + process.env.DATABASE_PORT + "\n\n  ServerPort = " + process.env.SERVER_PORT);
});
app.listen(process.env.SERVER_PORT, function () {
});
