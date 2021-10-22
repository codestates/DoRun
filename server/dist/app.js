"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv = require('dotenv');
var app = (0, express_1.default)();
app.get("/", function (req, res) {
    res.send([process.env.DATABASE_HOST, process.env.DATABASE_USER,
        process.env.DATABASE_PASSWORD, process.env.DATABASE_PORT]);
});
app.listen(1234, function () {
    console.log("Hello, World!");
});
