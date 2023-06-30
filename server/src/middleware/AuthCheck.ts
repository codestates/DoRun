import { NextFunction, Request, Response } from "express";

import { createAccessToken, verifyRefreshToken } from "../utils/token";

export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
  const accessTokenData = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!accessTokenData) {
    const refreshTokenData: any = verifyRefreshToken(req.cookies.refreshToken);

    if (!refreshTokenData) {
      return res.status(401).send({ message: "Unauthorized" });
    } else {
      const userinfo = {
        id: refreshTokenData.id,
        email: refreshTokenData.email,
      };

      const accessToken = createAccessToken(userinfo);
      req.body.token = accessToken;
      next();
    }
  }

  next();
};
