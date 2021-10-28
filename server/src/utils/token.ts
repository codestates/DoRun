import { sign, verify } from "jsonwebtoken";
import "dotenv/config";
import { User } from "../entity/User";

const AccessTokenCreate = (data: object) => {
  try {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "3h" });
  } catch (err) {
    return err;
  }
};

const RefreshTokenCreate = (data: object) => {
  try {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "3d" });
  } catch (err) {
    return err;
  }
};

const TokensCreate = async (userInfo: User) => {
  const { id, email } = userInfo;
  const accessToken: string = AccessTokenCreate({ id, email });
  const refreshToken: string = RefreshTokenCreate({ id, email });

  return { accessToken, refreshToken };
};

const AccessTokenVerify = (accessToken: string) => {
  try {
    return verify(accessToken, process.env.ACCESS_SECRET);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const RefreshTokenVerify = (accessToken: string) => {
  try {
    return verify(accessToken, process.env.REFRESH_SECRET);
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { TokensCreate, AccessTokenCreate, AccessTokenVerify, RefreshTokenVerify };
