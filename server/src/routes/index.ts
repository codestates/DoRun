import * as express from 'express';
import OauthRouter from './oauth'

const app = express();

app.use('/auth',OauthRouter)


export default app;