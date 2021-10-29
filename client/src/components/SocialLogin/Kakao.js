import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { kakaoUser } from '../../_actions/user_action';
const {REACT_APP_KAKAO_SOCIAL_LOGIN} = process.env

axios.defaults.withCredentials = true


const SocialLoginKakao = () => {

  const kakaoAPI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REACT_APP_KAKAO_SOCIAL_LOGIN}&redirect_uri=http://localhost:3000/login`;
  const dispatch = useDispatch();
  const history = useHistory();

 
  // 카카오 로그인 페이지를 로드합니다.
  const handleSocialLoginWithKakao = () => {
    window.location.assign(kakaoAPI)
  }

  let requestURL = new URL(window.location.href);
  let code = requestURL.searchParams.get('code');



  if (code) {
    dispatch(kakaoUser(code));
  }
  

  
  
    // const Kakao = styled.img`
  // width:202px;
  // height:47px;
  // border-radius: 5px;
  // box-shadow: 1px 1px 1px rgba(0, 0, 255, .2);`

  
  // id="kakaoLogin" width="200px" height="47px" padding="200px"

  return (
    <div>
       <img src="https://user-images.githubusercontent.com/64679541/139064326-3d5b494b-3941-44ea-9d98-3ad176e1c5e7.png" onClick={handleSocialLoginWithKakao} /> 
    </div>
  );
};

export default SocialLoginKakao;