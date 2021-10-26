import React from 'react'
import { useHistory } from 'react-router-dom';
import { GoogleLogin, onSuccess, onFailure } from 'react-google-login';
import axios from 'axios';

const SocialLoginGoogle = () => {

  const clientID = '517912812246-617k8sv5u7noe8ij90d9jtnfb683esq1.apps.googleusercontent.com'
  const history = useHistory();

  // 구글 연동 성공 시 실행되는 함수
  const responseSucess = async (response) => {

    const { email, imageUrl, name } = response.profileObj;

    const handleLogin = async (e) => {
      await axios.post('https://server.dorunapp.com/oauth/google', { email, imageUrl, name }, { headers: { 'Content-Type': 'application/json' } })
        .then((res) => {
          // isAuth = res.data.isAuth; 
          props.history.push('/')
        })
        .catch((e) => {
          console.log(e)
        })
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
        buttonText={'Sign in with Google'}
        responseType={"id_token"}
        onSuccess={responseSucess}
        onFailure={responseFail}
        cookiePolicy={'single_host_origin'}

      />
    </div>
  )
}

export default SocialLoginGoogle
