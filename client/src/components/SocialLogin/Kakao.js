import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Kakao.scss';
import { useDispatch, useSelector } from 'react-redux';
import { kakaoUser } from '../../_actions/user_action';
const { REACT_APP_KAKAO_SOCIAL_LOGIN } = process.env;
axios.defaults.withCredentials = true;

const SocialLoginKakao = () => {
  const kakaoAPI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REACT_APP_KAKAO_SOCIAL_LOGIN}&redirect_uri=http://localhost:3000/login`;
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  // 카카오 로그인 페이지를 로드합니다.
  const handleSocialLoginWithKakao = () => {
    window.location.assign(kakaoAPI);
  };

  let requestURL = new URL(window.location.href);
  let code = requestURL.searchParams.get('code');

  if (code) {
    dispatch(kakaoUser(code));
    history.push('/map');
  }

  return (
    <div className="kakaoBtnWrapper" onClick={handleSocialLoginWithKakao}>
      <div className="kakaoBtn"> </div>
      <span className="loginWithKakao"> LOGIN WITH KAKAO </span>
    </div>
  );
};

export default SocialLoginKakao;
