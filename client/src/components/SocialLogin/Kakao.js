import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
const { Kakao } = window;

/*
카카오 서버는 Redirect URI로 서비스에서 필요한 로그인 인증 정보를 보내고, 
서비스는 Redirect URI로 받은 로그인 인증 정보를 처리해 다음 단계 요청을 보냅니다. 
* 카카오 REST API(client Id 대신 사용) = 526ab21916301f258e4289fd4e2e601e
* 카카오 clientSecret = yXb4A5XihPw5REOqgnOsg0hVS4MBdBRn <- 아마도 필요 없을 듯 해요.
* 카카오 redirectUrl = https://server.dorunapp.com/oauth/kakao, http://localhost:3000 , http://localhost:3000/login  
*/

const SocialLoginKakao = () => {
  
  const kakaoAPI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=526ab21916301f258e4289fd4e2e601e&redirect_uri=https://server.dorunapp.com/oauth/kakao`;

  const handleKakaoLogin = async() => {
    if (!Kakao) {
      console.log('인가 받은 인스턴스가 아닙니다.')
    }
    else {
     
      // kakaoAPI 페이지를 로드(이동)합니다.
      window.location.assign(kakaoAPI);
      // 인증하고 kakaoAPI에 등록된 redirect URL로 이동합니다.
      // let requestURL = new URL(window.location.href);
    }
  }
  



  return (
    <div>
      <button style={{ width: '100%' }} onClick={handleKakaoLogin}>
        Kakao
      </button>
    </div>
  );
};

export default SocialLoginKakao;
