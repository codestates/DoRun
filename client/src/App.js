import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MapPage from './pages/MapPage/MapPage';
import MyPage from './pages/MyPage/MyPage';
import ChattingPage from './pages/ChattingPage/ChattingPage';
import Auth from './hoc/auth';
import Test from './pages/test';
import Nav from './components/Header/Nav';

const App = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  const userId = sessionStorage.getItem('userId');
  const userCrewId = sessionStorage.getItem('userCrewId');
  useEffect(() => {
    console.log('accessToken: ' + accessToken);
    console.log('userId: ' + userId);
    console.log('userCrewId: ' + userCrewId);
  }, [accessToken, userId, userCrewId]);

  return (
    <>
      <Nav />
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route path="/login" component={Auth(LoginPage, false)} />
        <Route path="/register" component={Auth(RegisterPage, false)} />
        <Route path="/map" component={Auth(MapPage, null)} />
        <Route path="/mypage" component={Auth(MyPage, true)} />
        <Route path="/chatting" component={Auth(ChattingPage, true)} />
        <Route path="/test" component={Test} />
      </Switch>
    </>
  );
};

export default App;
