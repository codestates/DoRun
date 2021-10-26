import * as express from "express";
import OauthRouter from "./oauth";

const app = express();

app.use("/oauth", OauthRouter);

export default app;
