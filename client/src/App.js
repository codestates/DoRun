import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MapPage from './pages/MapPage/MapPage';
import MyPage from './pages/MyPage/MyPage';
import ChattingPage from './pages/ChattingPage/ChattingPage';
// import Auth from './hoc/auth';
import Test from './pages/test';
import Nav from './components/Header/Nav';

const App = () => {
  // useEffect(() => {
  //   console.log('세션 스토리지 확인', sessionStorage.getItem('id'), sessionStorage.getItem('accessToken'))
  // }, [])

  return (
    <>
      <Nav />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/map" component={MapPage} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/chatting" component={ChattingPage} />
        <Route path="/test" component={Test} />
      </Switch>
    </>
  );
};

export default App;
