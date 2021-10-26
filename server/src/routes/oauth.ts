import { Router } from "express";
import * as OauthController from "../controllers/oauth";

const OauthRouter = Router();

OauthRouter.post("/google", OauthController.Google);
OauthRouter.get("/kakao", OauthController.Kakao);

export default OauthRouter;
