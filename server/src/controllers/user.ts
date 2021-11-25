import { Request, Response } from "express";
import { User } from "../entity/User";
import { TokensCreate, ConfirmEmailToken, AccessTokenVerify } from "../utils/token";
import * as bcrypt from "bcrypt";
import { signUpEmail, passwordSend } from "../utils/nodemailer";

const SignUp = async (req: Request, res: Response) => {
  try {
    const { nickname, email }: { nickname: string; email: string } = req.body;

    const password = await bcrypt.hash(req.body.password, 10);

    const userEmailCheck = await User.findOne({ email });
    console.log(password);
    if (userEmailCheck) {
      return res.status(401).send({ message: `${email} already exists` });
    }

    let userInfo = User.create({
      nickname,
      password,
      email,
    });

    userInfo = await User.save(userInfo);

    const { accessToken, refreshToken } = await TokensCreate(userInfo);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 60 * 60 * 24 * 3, //3day
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });

    const token = await ConfirmEmailToken(email);

    signUpEmail(email, userInfo.id, token);

    return res.status(200).send({ data: userInfo, accessToken, message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

const SignOut = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(500).send({ message: "Not UserId" });
    }
    const userInfo = await User.findOneOrFail(userId);
    await User.remove(userInfo);
    res.clearCookie("refreshToken");
    return res.status(200).send({ message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }

  //유저 탈퇴할때 크루멤버가 0이면 삭제
};
const Login = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const userInfo = await User.findOne({ email });

    //if (!userInfo || password !== userInfo.password) {
    console.log(userInfo.password);
    const hash = await bcrypt.compare(password, userInfo.password);
    if (!userInfo || !hash) {
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
    return res.status(200).send({ message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};
const Edit = async (req: Request, res: Response) => {
  try {
    let userInfo = await User.findOne({ id: req.body.userId });
    const hash = await bcrypt.compare(req.body.password, userInfo.password);
    if (!userInfo || !hash) {
      return res.status(400).send(); //400은 message를 줄수없음
    }

    userInfo.nickname = req.body.nickname || userInfo.nickname;
    if (!!req.file) {
      userInfo.image = req.file["location"] || userInfo.image;
    }
    if (req.body.newPassword) {
      const hashingPassword = await bcrypt.hash(req.body.newPassword, 10);
      userInfo.password = hashingPassword;
    }

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

const userConfirmEmail = async (req: Request, res: Response) => {
  try {
    const { userId, token }: any = req.params;

    const data = await AccessTokenVerify(token);

    const userInfo = await User.findOne({ id: userId });

    if (!data || !userInfo) {
      res.send(
        `<script type="text/javascript">alert("Not verified"); window.location="/"; </script>`
      );
    } else {
      userInfo.isauth = true;
      User.save(userInfo);

      res.send(
        `<script type="text/javascript">alert("Successfully verified"); window.location="/"; </script>`
      );
    }
  } catch (err) {
    res.send(
      `<script type="text/javascript">alert("Not verified"); window.location="/"; </script> 
      err:${err}`
    );
  }
};

const ConfirmEmailReSend = async (req: Request, res: Response) => {
  try {
    const { userId, email }: { userId: number; email: string } = req.body;
    if (!userId || !email) {
      return res.status(400).send({ message: "invalid user info" });
    }

    const token = await ConfirmEmailToken(email);

    signUpEmail(email, userId, token);

    res.status(200).send({ message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

const PasswordReset = async (req: Request, res: Response) => {
  try {
    const { email }: { email: string } = req.body;

    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      return res.status(400).send({ message: "invalid user email" });
    }

    const randomPassword = Math.random().toString(36).substr(2, 11);
    passwordSend(email, randomPassword);

    const hashingPassword = await bcrypt.hash(randomPassword, 10);
    userInfo.password = hashingPassword;

    const SavedUser = User.save(userInfo);

    res.status(200).send({ message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

export {
  SignUp,
  SignOut,
  Login,
  logout,
  Edit,
  userInfo,
  userConfirmEmail,
  ConfirmEmailReSend,
  PasswordReset,
};
