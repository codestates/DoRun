import './App.scss';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { guestLogoutUser } from './_actions/user_action';

const App = () => {
  const userId = useSelector((state) => state.user.userId);
  const userCrewId = useSelector((state) => state.user.userCrewId);
  const userEmail = useSelector((state) => state.user.email);
  const [loading, setLoading] = useState(false);
  let [guestModeTime, setGuestModeTime] = useState(10)
  let [guestModeTimeout, setGuestModeTimeout] = useState(false);
  const dispatch = useDispatch();



  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);

    if (userEmail === "Guest@Guest.com") {
      setTimeout(() => { // 전체 시간(15)초가 지난 뒤에 종료
        dispatch(guestLogoutUser());
      }, 1000 * 20);

      setTimeout(() => { // 5초가 지난 뒤, 1초마다 한번씩 반복
        setGuestModeTimeout(true);
        setInterval(() => {
          setGuestModeTime(guestModeTime -= 1)
          if (guestModeTime === 0) {
            setGuestModeTimeout(false);
            document.location.href = '/';
          }
        }, 1000 * 1);
      }, 1000 * 10);

    }





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
          {guestModeTimeout ?
            <div className="guestModeTimeoutAlret">
              <div className="guestModeTimeoutNotice">{guestModeTime}초 뒤, <br /> 게스트 모드가 종료됩니다.</div>
            </div>
            : ''}
        </>
      )
      }
    </>
  );
};

export default App;
