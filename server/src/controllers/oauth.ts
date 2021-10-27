import { User } from "../entity/User";
import { Request, Response } from "express";
import axios from "axios";
import { TokensCreate } from "../utils/token";

const Google = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(500).send({ message: "Internal Server Error" });
    }

    let userinfo = await User.findOne({ email: req.body.email });

    if (!userinfo) {
      let userinfo = User.create({
        nickname: req.body.name,
        email: req.body.email,
        image: req.body.imageUrl,
        isauth: true,
      });
      userinfo = await User.save(userinfo);
    }

    const { accessToken, refreshToken } = await TokensCreate(userinfo);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });

    return res.send({
      data: userinfo,
      accessToken,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

const Kakao = async (req: Request, res: Response) => {
  try {
    const tokenUrl = "https://kauth.kakao.com/oauth/token";
    const userInfoUrl = "https://kapi.kakao.com/v2/user/me";

    const { data } = await axios.post(
      tokenUrl,
      formUrlEncoded({
        code: req.body.authorizationCode,
        //code: req.query.code,
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_CLIENT_ID,
        redirect_uri: process.env.KAKAO_REDIRECT_URL,
      }),
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!data) {
      return res.status(500).send({
        message: "invalid authorizationCode",
      });
    }

    const kakaoAccessToken = data["access_token"];
    const kakaoUserInfo = await axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    });

    const kakaoEmail = `${kakaoUserInfo.data["id"]}@kakao.com`;

    let userinfo = await User.findOne({ email: kakaoEmail });
    if (!userinfo) {
      const nickname = kakaoUserInfo.data["kakao_account"].profile.nickname;
      const image = kakaoUserInfo.data["kakao_account"].profile.profile_image_url;
      userinfo = User.create({
        nickname,
        image,
        email: kakaoEmail,
        password: kakaoUserInfo.data["id"],
        isauth: true,
      });
      userinfo = await User.save(userinfo);
    }

    const { accessToken, refreshToken } = await TokensCreate(userinfo);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 60 * 60 * 24 * 7, //7day
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });

    return res.status(200).send({ data: userinfo, accessToken, message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

const formUrlEncoded = (x) =>
  Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, "");

export { Google, Kakao };
