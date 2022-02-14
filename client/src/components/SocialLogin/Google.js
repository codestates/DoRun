import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { googleUser } from '../../_actions/user_action';

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const SocialLoginGoogle = () => {
  const dispatch = useDispatch();

  const responseSucess = async (response) => {
    const handleLogin = async (e) => {
      dispatch(googleUser(response.profileObj))
        .then((res) => {
          if (res.payload.data.id) {
            document.location.href = '/';
          }
        })
        .catch((e) => console.log(e));
    };

    handleLogin();
  };

  const responseFail = (e) => {
    console.log(e);
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
