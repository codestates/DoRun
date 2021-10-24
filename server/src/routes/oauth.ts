import { Router } from 'express';
import * as OauthController from '../controllers/oauth'

const OauthRouter = Router();


OauthRouter.post('/google',OauthController.Google);
OauthRouter.post('/kakao',OauthController.Kakao);

export default OauthRouter;