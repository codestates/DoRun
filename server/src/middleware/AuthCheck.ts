import { NextFunction, Request, Response } from "express";

import { AccessTokenCreate, AccessTokenVerify, RefreshTokenVerify } from "../utils/token";

//1 Access토큰 만료
//2 Refresh토큰 만료

export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
  //클라이언트에서 오는거보고 수정
  let accessTokenData = AccessTokenVerify(req.headers["authorization"]);

  if (!accessTokenData) {
    const refreshTokenData: any = RefreshTokenVerify(req.cookies.refreshToken);

    if (!refreshTokenData) {
      res.status(401).send({ message: "Unauthorized" });
    } else {
      const userinfo = {
        id: refreshTokenData.id,
        email: refreshTokenData.email,
      };
      //테스트 해봐야함 req.headers에 데이터를 서버에서 수정하면 클라이언트에도 반영이되는지
      const accessToken = AccessTokenCreate(userinfo);
      req.headers.authorization = accessToken;
      return next();
    }
  }
  next();
};
