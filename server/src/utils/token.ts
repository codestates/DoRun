import { sign, verify } from "jsonwebtoken";
import "dotenv/config";
import { User } from "../entity/User";

const createAccessToken = (data: object) => {
  try {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "3h" });
  } catch (err) {
    return err;
  }
};

const createRefreshToken = (data: object) => {
  try {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "3d" });
  } catch (err) {
    return err;
  }
};

const createTokens = async (userInfo: User) => {
  const { id, email } = userInfo;
  const accessToken: string = createAccessToken({ id, email });
  const refreshToken: string = createRefreshToken({ id, email });

  return { accessToken, refreshToken };
};

const verifyAccessToken = async (accessToken: string) => {
  try {
    return verify(accessToken, process.env.ACCESS_SECRET);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const verifyRefreshToken = (accessToken: string) => {
  try {
    return verify(accessToken, process.env.REFRESH_SECRET);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const confirmEmailToken = async (email: string) => {
  try {
    return sign({ email }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
  } catch (err) {
    console.log(err);
  }
};

export {
  createTokens,
  createAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
  confirmEmailToken,
};
