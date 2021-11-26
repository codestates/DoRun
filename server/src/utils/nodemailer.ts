import { Strings } from "aws-sdk/clients/opsworks";
import * as nodemailer from "nodemailer";
import { callbackify } from "util";

export const signUpEmail = async (email: string, userId: number, token: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    //const url = `http://localhost:3001/user/confirm/${token}/${userId}`;
    const url = `${process.env.SERVER_URL}/user/confirm/${token}/${userId}`;

    const emailInfo = await transporter.sendMail({
      from: `Dorun ${process.env.NODEMAILER_USER}`,
      to: email,
      subject: "이메일 인증",
      text: `링크:${url}`,
    });
  } catch (err) {
    console.log(err);
  }
};

export const passwordSend = async (email: string, password: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const emailInfo = await transporter.sendMail({
      from: `Dorun ${process.env.NODEMAILER_USER}`,
      to: email,
      subject: "비밀번호 초기화",
      text: `변경된 비밀번호 ${password}`,
    });
  } catch (err) {
    console.log(err);
  }
};
