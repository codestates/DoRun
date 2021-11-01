import { User } from "../entity/User";
import { Request, Response } from "express";
import { TokensCreate } from "../utils/token";

const SignUp = async (req: Request, res: Response) => {
  try {
    const { nickname, password, email } = req.body;

    const userEmailCheck = await User.findOne({ email });

    if (userEmailCheck) {
      return res.status(401).send({ message: `${email} already exists` });
    }

    let userInfo = User.create({
      nickname,
      password,
      email,
      image: req.body.imageUrl || null, //확인필요
      //isauth: true,
    });

    userInfo = await User.save(userInfo);

    const { accessToken, refreshToken } = await TokensCreate(userInfo);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 60 * 60 * 24 * 3, //3day
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });

    return res.status(200).send({ data: userInfo, accessToken, message: "success" });
    //////////////////////////////////////////
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

const SignOut = async (req: Request, res: Response) => {
  try {
    const userInfo = await User.findOne(req.body.userId);
    await User.remove(userInfo);
    res.status(200).send({ message: "success" });
    res.clearCookie("refreshToken");
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};
const Login = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const userInfo = await User.findOne({ email });

    if (!userInfo || password !== userInfo.password) {
      return res.status(400).send(); //400은 message를 줄수없음
    }
    //const isauth = true;
    //await User.update(userInfo.id, { isauth });

    const { accessToken, refreshToken } = await TokensCreate(userInfo);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 60 * 60 * 24 * 3, //3day
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });

    return res.status(200).send({ data: userInfo, accessToken, message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};
const logout = async (req: Request, res: Response) => {
  try {
    const userInfo = await User.findOne(req.body.userId);
    //const isauth = false;
    //await User.update(userInfo.id, { isauth });
    res.clearCookie("refreshToken");
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};
const Edit = async (req: Request, res: Response) => {
  try {
    let userInfo = await User.findOne({ id: req.body.userId });
    if (!userInfo) {
      return res.status(400).send({ message: "invalid userId" });
    }

    userInfo.nickname = req.body.nickname || userInfo.nickname;
    userInfo.password = req.body.password || userInfo.password;
    userInfo.email = req.body.email || userInfo.email;
    userInfo.image = req.body.image || userInfo.image;
    console.log(userInfo);

    const updateUser = await User.save(userInfo);
    if (req.body.token) {
      const accessToken = req.body.token;
      return res.status(201).send({ data: updateUser, accessToken, message: "success" });
    }

    return res.status(201).send({ data: updateUser, message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

const userInfo = async (req: Request, res: Response) => {
  try {
    const { userId }: any = req.params;

    const userInfo = await User.findOne({ id: userId });

    if (!userInfo) return res.status(400).send({ message: "invalid userId" });

    if (req.body.token) {
      const accessToken = req.body.token;
      return res.status(201).send({ data: userInfo, accessToken, message: "success" });
    }

    return res.status(200).send({ data: userInfo, message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

export { SignUp, SignOut, Login, logout, Edit, userInfo };
