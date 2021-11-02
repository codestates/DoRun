import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MapPage from './pages/MapPage/MapPage';
import MyPage from './pages/MyPage/MyPage';
import MyAccount from './pages/MyPage/MyAccount/MyAccount';
import MyDoRun from './pages/MyPage/MyDoRun/MyDoRun';
import MyHistory from './pages/MyPage/MyHistory/MyHistory';
import MyMedal from './pages/MyPage/MyMedal/MyMedal';
import ChattingPage from './pages/ChattingPage/ChattingPage';
// import Auth from './hoc/auth';
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
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/map" component={MapPage} />
        <Route exact path="/mypage" component={MyPage} />
        <Route path="/mypage/account" component={MyAccount} />
        <Route path="/mypage/dorun" component={MyDoRun} />
        <Route path="/mypage/history" component={MyHistory} />
        <Route path="/mypage/medal" component={MyMedal} />
        <Route path="/chatting" component={ChattingPage} />
        <Route path="/test" component={Test} />
      </Switch>
    </>
  );
};

export default App;
