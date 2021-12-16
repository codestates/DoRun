import * as express from "express";
import OauthRouter from "./oauth";
import userRoter from "./user";
import crewRoter from "./crew";

const app = express();

app.use("/oauth", OauthRouter);
app.use("/user", userRoter);
app.use("/crew", crewRoter);

export default app;
