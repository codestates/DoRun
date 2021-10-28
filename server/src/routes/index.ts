import * as express from "express";
import OauthRouter from "./oauth";
import userRoter from "./user";

const app = express();

app.use("/oauth", OauthRouter);

app.use("/user", userRoter);

export default app;
