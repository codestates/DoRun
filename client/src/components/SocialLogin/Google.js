import React from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { googleUser } from '../../_actions/user_action';

const SocialLoginGoogle = () => {

  const clientID = '517912812246-617k8sv5u7noe8ij90d9jtnfb683esq1.apps.googleusercontent.com'
  const history = useHistory();
  const dispatch = useDispatch();

  // 구글 연동 성공 시 실행되는 함수
  const responseSucess = async (response) => {

    const { email, imageUrl, name, isauth } = response.profileObj;

    const handleLogin = async (e) => {
      dispatch(googleUser(response.profileObj))
    }

    handleLogin();
  }

  // 구글 연동 실패 시 실행되는 함수
  const responseFail = (e) => {
    console.log(e)

  }


  return (
    <div>
      <GoogleLogin
        clientId={clientID}
        buttonText={'Login with Google'}
        responseType={"id_token"}
        onSuccess={responseSucess}
        onFailure={responseFail}
        cookiePolicy={'single_host_origin'}
        className='google'
        style={{width:"200px"}}
      />
    </div>
  )
}

export default SocialLoginGoogle
