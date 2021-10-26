import { User } from "../entity/User";
import { Request, Response } from "express";
import axios from "axios";

const formUrlEncoded = (x) =>
  Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, "");

const Google = async (req: Request, res: Response) => {
  try {
    const userinfo = await User.create({
      nickname: req.body.name,
      email: req.body.email,
      image: req.body.imageUrl,
      isauth: true,
    });
    User.save(userinfo);
    if (!userinfo) {
      return res.status(500).send({
        message: "Internal Server Error",
      });
    }
    return res.send({
      data: userinfo,
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
        //code: req.body.authorizationCode,
        code: req.query.code,
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

    let userInfo = await User.findOne({ email: kakaoEmail });
    if (!userInfo) {
      const nickname = kakaoUserInfo.data["kakao_account"].profile.nickname;
      const image = kakaoUserInfo.data["kakao_account"].profile.profile_image_url;
      const userKakao = User.create({
        nickname,
        image,
        email: kakaoEmail,
        password: kakaoUserInfo.data["id"],
        isauth: true,
      });
      User.save(userKakao);
      return res.status(200).send({ data: userKakao, message: "success" });
    } else {
      return res.status(200).send({ data: userInfo, message: "success" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

export { Google, Kakao };
