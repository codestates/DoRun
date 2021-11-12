import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { googleUser } from '../../_actions/user_action';

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const SocialLoginGoogle = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // 구글 연동 성공 시 실행되는 함수
  const responseSucess = async (response) => {
    const handleLogin = async (e) => {
      dispatch(googleUser(response.profileObj));
      document.location.href = '/';
    };

    handleLogin();
  };

  // 구글 연동 실패 시 실행되는 함수
  const responseFail = (e) => {
    console.log(e);
    history.push('/');
  };

  return (
    <div>
      <GoogleLogin
        clientId={REACT_APP_GOOGLE_CLIENT_ID}
        buttonText={'Login with Google'}
        responseType={'id_token'}
        onSuccess={responseSucess}
        onFailure={responseFail}
        cookiePolicy={'single_host_origin'}
        className="google"
      />
    </div>
  );
};

export default SocialLoginGoogle;
