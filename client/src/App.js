import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MapPage from './pages/MapPage/MapPage';
import MyPage from './pages/MyPage/MyPage';
import ChatPage from './pages/ChatPage/ChatPage';
import Nav from './components/Header/Nav';
import Loading from './components/Loading/Loading';

const App = () => {
  const userId = useSelector((state) => state.user.userId);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
            <Route path="/map" component={MapPage} />
            {userId ? (
              <>
                <Route path="/mypage" component={MyPage} />
                <Route path="/chat" component={ChatPage} />
              </>
            ) : (
              <>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
              </>
            )}
          </Switch>
        </>
      )}
    </>
  );
};

export default App;
