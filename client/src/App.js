import React from 'react'
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import MapPage from './pages/MapPage/MapPage';
import MyPage from './pages/MyPage/MyPage';
import ChattingPage from './pages/ChattingPage/ChattingPage';
import Test from './pages/test';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/map' component={MapPage} />
        <Route path='/mypage' component={MyPage} />
        <Route path='/chatting' component={ChattingPage} />
        <Route path='/test' component={Test} />        
      </Switch>
    </>
  );
}

export default App;
