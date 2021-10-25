import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
const { Kakao } = window;

/*
카카오 서버는 Redirect URI로 서비스에서 필요한 로그인 인증 정보를 보내고, 
서비스는 Redirect URI로 받은 로그인 인증 정보를 처리해 다음 단계 요청을 보냅니다. 
=> Redirect URI : https://server.dorunapp.com/oauth/kakao
*/

const SocialLoginKakao = () => {
  const kakaoAPI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=526ab21916301f258e4289fd4e2e601e&redirect_uri=http://localhost:3000`;

  const handleKakaoLogin = () => {
    window.location.assign(kakaoAPI);
    let requestURL = new URL(window.location.href);
    console.log(requestURL);
    new URL(window.location.href).searchParams.get("code");
  };

  return (
    <div>
      <button style={{ width: "100%" }} onClick={handleKakaoLogin}>
        Kakao
      </button>
    </div>
  );
};

export default SocialLoginKakao;
