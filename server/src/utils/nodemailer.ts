import * as nodemailer from "nodemailer";

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
    const url = `${process.env.SERVER_URL}/user/confirm/${token}/${userId}`;

    await transporter.sendMail({
      from: `Dorun ${process.env.NODEMAILER_USER}`,
      to: email,
      subject: "이메일 인증",
      html: `<body>
      <div
    style="font-family: 'Apple SD Gothic Neo', 'sans-serif' !important; width: 540px; height: 600px; margin: auto 50px; padding: 30px 0px; box-sizing: border-box;">
        <h1 style="margin: 0; color: #3bc9db; font-size: 60px;">Do Run</h1>
        <hr style="height: 0; border: 0; border-top: 1px solid #ddd; margin-bottom: 30px;" />
        <div>
          <h1 style="margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;">
            <span style="color: #3bc9db;">메일인증</span> 안내입니다.
          </h1>
          <p style="font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;">
            안녕하세요.<br />
            <b style="font-size: 18px;">DoRun</b>과 함께 해주셔서 진심으로 감사드립니다.<br />
            아래 <b style="color: #3bc9db;">'메일 인증'</b> 버튼을 클릭하여 회원가입을 완료해 주세요.<br />
            감사합니다.
          </p>
    
          <a style="color: #FFF; text-decoration: none; text-align: center;" href=${url} target="_blank">
            <p
              style="display: inline-block; width: 210px; height: 45px; margin: 30px 5px 40px; background: #3bc9db; line-height: 45px; vertical-align: middle; font-size: 16px;">
              메일 인증</p>
          </a>
    
          <div style="border-top: 1px solid #DDD; padding: 5px; margin-top: 20px;">
            <p style="font-size: 14px; line-height: 21px; color: #555;">
              @ Team-DoRun All right reserved.<br />
            </p>
          </div>
        </div>
      </div>
    </body>`,
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

    await transporter.sendMail({
      from: `Dorun ${process.env.NODEMAILER_USER}`,
      to: email,
      subject: "비밀번호 초기화",
      text: `변경된 비밀번호 ${password}`,
    });
  } catch (err) {
    console.log(err);
  }
};
