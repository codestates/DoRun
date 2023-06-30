import { Request, Response } from "express";
import { User } from "../entity/User";
import { Crew } from "../entity/Crew";
import { Chat } from "../entity/Chat";
import { createTokens, confirmEmailToken, verifyAccessToken } from "../utils/token";
import * as bcrypt from "bcrypt";
import { signUpEmail, passwordSend } from "../utils/nodemailer";

interface UserInterface {
  id?: number;
  nickname?: string;
  password?: string;
  email?: string;
  token?: string;
}

const deleteCrewInUser = async (crewId: number) => {
  const CrewInUser = await User.find({ crewId });

  if (CrewInUser.length === 0) {
    const chatInfo = await Chat.find({ crewId });
    await Chat.remove(chatInfo);
    const crewInfo = await Crew.findOne({ id: crewId });
    await Crew.remove(crewInfo);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { nickname, email }: UserInterface = req.body;

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

    //const { accessToken, refreshToken } = await TokensCreate(userInfo);
    // res.cookie("refreshToken", refreshToken, {
    //   maxAge: 60 * 60 * 24 * 3, //3day
    //   sameSite: "none",
    //   httpOnly: true,
    //   secure: true,
    // });

    const token = await confirmEmailToken(email);

    signUpEmail(email, userInfo.id, token);

    //return res.status(200).send({ data: userInfo, accessToken, message: "success" });
    return res.status(200).send({ data: userInfo, message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (!userId) {
      return res.status(500).send({ message: "Not UserId" });
    }
    const userInfo = await User.findOneOrFail(userId);
    await User.remove(userInfo);
    res.clearCookie("refreshToken");

    if (userInfo.crewId) {
      deleteCrewInUser(userInfo.crewId);
    }
    return res.status(200).send({ message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};
const logInUser = async (req: Request, res: Response) => {
  try {
    const { password, email }: UserInterface = req.body;
    const userInfo = await User.findOne({ email });
    const hash = await bcrypt.compare(password, userInfo.password);

    if (!userInfo || !hash) {
      return res.status(400).send();
    }

    const { accessToken, refreshToken } = await createTokens(userInfo);
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
const logOutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken");
    return res.status(200).send({ message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};
const modifyUser = async (req: Request, res: Response) => {
  try {
    const userInfo = await User.findOne({ id: req.body.userId });
    const hash = await bcrypt.compare(req.body.password, userInfo.password);
    if (!userInfo || !hash) {
      return res.status(400).send();
    }

    userInfo.nickname = req.body.nickname || userInfo.nickname;
    if (req.file) {
      userInfo.image = (req.file as Express.MulterS3.File).location || userInfo.image;
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

const findUser = async (req: Request, res: Response) => {
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

const confirmUserEmail = async (req: Request, res: Response) => {
  try {
    const { userId, token }: any = req.params;
    const data = await verifyAccessToken(token);

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

const sendConfirmEmail = async (req: Request, res: Response) => {
  try {
    const { userId, email } = req.body;
    if (!userId || !email) {
      return res.status(400).send({ message: "invalid user info" });
    }

    const token = await confirmEmailToken(email);
    signUpEmail(email, userId, token);

    res.status(200).send({ message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email }: UserInterface = req.body;
    const userInfo = await User.findOne({ email });
    const randomPassword = Math.random().toString(36).substr(2, 11);
    const hashingPassword = await bcrypt.hash(randomPassword, 10);

    if (!userInfo) {
      return res.status(400).send({ message: "invalid user email" });
    }

    await passwordSend(email, randomPassword);

    userInfo.password = hashingPassword;
    await User.save(userInfo);

    res.status(200).send({ message: "success" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

const logInGuest = async (req: Request, res: Response) => {
  try {
    let userInfo = User.create({
      nickname: "Guest",
      email: "Guest@Guest.com",
      isauth: true,
    });

    userInfo = await User.save(userInfo);

    res.status(200).send({ data: userInfo, Message: "success" });

    setTimeout(async () => {
      userInfo = await User.findOne({ id: userInfo.id });
      await User.remove(userInfo);
      if (userInfo.crewId) {
        deleteCrewInUser(userInfo.crewId);
      }
    }, 1000 * 60 * 30); //30min
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

const modifyHistory = async (req: Request, res: Response) => {
  try {
    const { data, userId }: { data: string; userId: number } = req.body;

    const userInfo = await User.findOne({ id: userId });
    if (!userInfo || !userId) {
      return res.status(400).send({ message: "invalid userinfo" });
    }

    const logged = userInfo.log;
    if (!logged) {
      userInfo.log = [data];
    } else {
      userInfo.log = [...logged, data];
    }

    User.save(userInfo);

    res.status(200).send({ message: "success", data: userInfo });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err: err });
  }
};

//
export {
  createUser,
  deleteUser,
  logInUser,
  logOutUser,
  modifyUser,
  findUser,
  confirmUserEmail,
  sendConfirmEmail,
  resetPassword,
  logInGuest,
  modifyHistory,
};
