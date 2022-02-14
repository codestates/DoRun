import axios from 'axios';
import './Kakao.scss';
import { useDispatch } from 'react-redux';
import { kakaoUser } from '../../_actions/user_action';
const { REACT_APP_KAKAO_SOCIAL_LOGIN, REACT_APP_KAKAO_REDIRECT_URL } =
  process.env;
axios.defaults.withCredentials = true;

const SocialLoginKakao = () => {
  const kakaoAPI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REACT_APP_KAKAO_SOCIAL_LOGIN}&redirect_uri=${REACT_APP_KAKAO_REDIRECT_URL}`;

  const dispatch = useDispatch();

  const handleSocialLoginWithKakao = () => {
    window.location.assign(kakaoAPI);
  };

  let requestURL = new URL(window.location.href);
  let code = requestURL.searchParams.get('code');

  if (code) {
    dispatch(kakaoUser(code))
      .then((res) => {
        if (res.payload.message === 'success') {
          document.location.href = '/';
        }
      })
      .catch((e) => console.log(e));
  }

  return (
    <div className="kakaoBtnWrapper" onClick={handleSocialLoginWithKakao}>
      <div className="kakaoBtn"> </div>
      <span className="loginWithKakao"> LOGIN WITH KAKAO </span>
    </div>
  );
};

export default SocialLoginKakao;
