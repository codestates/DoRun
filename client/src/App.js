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
import WrongApproach from './pages/WrongApproach/WrongApproach';
import RegisterSuccess from './components/RegisterSuccess/RegisterSuccess';

const App = () => {
  const userId = useSelector((state) => state.user.userId);
  const userCrewId = useSelector((state) => state.user.userCrewId);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
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
            <Route path="/welcome" component={RegisterSuccess} />
            {userId ? (
              <>
                {userCrewId ? (
                  <Route path="/chat" component={ChatPage} />
                ) : (
                  <Route path="/chat" component={WrongApproach} />
                )}
                <Route path="/mypage" component={MyPage} />
                <Route path="/login" component={WrongApproach} />
                <Route path="/register" component={WrongApproach} />
              </>
            ) : (
              <>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/mypage" component={WrongApproach} />
                <Route path="/chat" component={WrongApproach} />
              </>
            )}
          </Switch>
        </>
      )}
    </>
  );
};

export default App;
