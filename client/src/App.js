import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MapPage from './pages/MapPage/MapPage';
import MyPage from './pages/MyPage/MyPage';
import ChatPage from './pages/ChatPage/ChatPage';
// import Auth from './hoc/auth';
import Nav from './components/Header/Nav';
import Loading from './components/Loading/Loading';

const App = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  const userId = sessionStorage.getItem('userId');
  const userCrewId = sessionStorage.getItem('userCrewId');
  const userNickname = sessionStorage.getItem('userNickname');

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  useEffect(() => {
    console.log('accessToken: ' + accessToken);
    console.log('userId: ' + userId);
    console.log('userCrewId: ' + userCrewId);
    console.log('userNickname: ' + userNickname);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Nav />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/map" component={MapPage} />
            <Route path="/mypage" component={MyPage} />
            <Route path="/chat" component={ChatPage} />
          </Switch>
        </>
      )}
    </>
  );
};

export default App;
