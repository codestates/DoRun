import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
axios.defaults.withCredentials = true;

/*
카카오 서버는 Redirect URI로 서비스에서 필요한 로그인 인증 정보를 보내고, 
서비스는 Redirect URI로 받은 로그인 인증 정보를 처리해 다음 단계 요청을 보냅니다. 
* 카카오 REST API(client Id 대신 사용) = 526ab21916301f258e4289fd4e2e601e
* 카카오 JS key = 887dddeb1554071f577f2ad9bef8d920
* 카카오 clientSecret = yXb4A5XihPw5REOqgnOsg0hVS4MBdBRn <- 아마도 필요 없을 듯 해요.
* 카카오 redirectUrl = https://server.dorunapp.com/oauth/kakao, http://localhost:3000 , http://localhost:3000/login  
*/

const SocialLoginKakao = () => {
  const kakaoAPI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=526ab21916301f258e4289fd4e2e601e&redirect_uri=http://localhost:3000/map`;
  const history = useHistory();

  // 카카오 로그인 페이지를 로드합니다.
  const handleKakaoLogin = async () => {
    window.location.assign(kakaoAPI);
  };

  const Kakao = styled.img`
    width: 202px;
    height: 47px;

    border-radius: 5px;
    box-shadow: 1px 1px 1px rgba(0, 0, 255, 0.2);
  `;

  return (
    <div>
      <Kakao
        src="https://user-images.githubusercontent.com/64679541/139064326-3d5b494b-3941-44ea-9d98-3ad176e1c5e7.png"
        onClick={handleKakaoLogin}
      />
    </div>
  );
};

export default SocialLoginKakao;
