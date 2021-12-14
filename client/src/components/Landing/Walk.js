import './Walk.scss';
import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GuestModeModal from '../_Modal/GuestModeModal/GuestModeModal';
<<<<<<< HEAD
import GuestModeModalBack from '../_Modal/GuestModeModal/GuestModeModal';
=======
import GuestModeModalBack from '../_Modal/GuestModeModal/GuestModeModalBack';
>>>>>>> d4111cbc49f5a80a90db7116a77d955d6ed46605
import walk from './LandingSVG/walk.svg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function Walk({ guestTimeout, setGuestTimeout }) {
  const run = useRef(null);
  const line = useRef(null);
  const userId = useSelector((state) => state.user.userId);
  const [guestMode, setGuestMode] = useState(false);

  useEffect(() => {
    gsap.to(run.current, {
      x: '20%',
      duration: 5,
      ease: 'back',
      opacity: 1,
      repeat: -1,
      repeatDelay: 2,
    });

    gsap.to(line.current, {
      y: '-50%',
      duration: 5,
      ease: 'back',
      opacity: 1,
      repeat: -1,
      repeatDelay: 2,
    });
  });

  const history = useHistory();

  const pagehandler = () => {
    history.push('/map');
  };

  const guestModeHandler = () => {
    setGuestMode(true);
  };

  return (
    <>
      <div className="walkWrapper">
        <img className="walk" src={walk} ref={run} />
        <div className="walkInfo" ref={line}>
          <div className="line"> 혼자 뛰기 심심할 때, </div>
          <div className="line"> '오늘만 함께 할' </div>
          <div className="line"> Do Run 메이트를 만들어보세요! </div>
          <div className="btnWrapper">
            <div className="walkBtn" onClick={pagehandler}>
              Do Run!!
            </div>
            {userId ? (
              ''
            ) : (
              <div className="guestBtn" onClick={guestModeHandler}>
                Guest Mode
              </div>
            )}
          </div>
        </div>
        <GuestModeModal guestMode={guestMode} setGuestMode={setGuestMode} />
        <GuestModeModalBack guestMode={guestMode} />
      </div>
    </>
  );
}

export default Walk;
