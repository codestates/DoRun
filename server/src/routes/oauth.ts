import { Router } from "express";
import * as OauthController from "../controllers/oauth";

const OauthRouter = Router();

OauthRouter.post("/google", OauthController.loginGoogle);
OauthRouter.post("/kakao", OauthController.loginKakao);

export default OauthRouter;
