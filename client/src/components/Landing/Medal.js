import React, { useRef, useEffect } from 'react';
import './Medal.scss';
import grow from './LandingSVG/growing.svg';
import medal1 from './LandingSVG/medal1.png';
import medal2 from './LandingSVG/medal2.png';
import medal3 from './LandingSVG/medal3.png';
import winner from './LandingSVG/winner.png';
import topBtn from './LandingSVG/topBtn.png';
import medalsBack from './LandingSVG/medalBack.svg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function Medal() {
  const growing = useRef(null);
  const medalFirst = useRef(null);
  const medalSecond = useRef(null);
  const medalThird = useRef(null);
  const winnerTrophy = useRef(null);
  const theTopBtn = useRef(null);
  const medalBackIMG = useRef(null);

  useEffect(() => {
    gsap.to(growing.current, {
      x: '40%',
      duration: 4,
      scrollTrigger: {
        scrub: 3,
        start: '60% top',
      },
    });

    gsap.to(medalFirst.current, {
      y: '-250%',
      duration: 11,
      ease: 'none',
      opacity: 1,
      scrollTrigger: {
        scrub: 3,
        start: '40% top',
      },
    });
    gsap.to(medalSecond.current, {
      y: '-250%',
      duration: 13,
      ease: 'none',
      opacity: 1,
      scrollTrigger: {
        scrub: 3,
        start: '43% top',
      },
    });
    gsap.to(medalThird.current, {
      y: '-250%',
      duration: 13,
      ease: 'none',
      opacity: 1,
      scrollTrigger: {
        scrub: 3,
        start: '47% top',
      },
    });
    gsap.to(winnerTrophy.current, {
      y: '-250%',
      duration: 13,
      ease: 'none',
      opacity: 1,
      scrollTrigger: {
        scrub: 3,
        start: '50% top',
      },
    });

    gsap.to(theTopBtn.current, {
      y: '-250%',
      duration: 1,
      ease: 'back',
      opacity: 1,
      repeat: -1,
      repeatDelay: 1,
    });

    var tl = gsap.timeline({
      scrollTrigger: {
        start: '50% top',
        end: 'bottom bottom',
        opacity: 0,
        scrub: 3,
        toggleActions: 'play reverse play reverse',
      },
    });

    tl.to(medalBackIMG.current, {
      opacity: 0,
    });
    tl.to(medalBackIMG.current, {
      opacity: 0.3,
    });
    tl.to(medalBackIMG.current, {
      opacity: 1,
    });
  });

  const pageMovingHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="medalWrapper">
      <div className="growingTextWrapper">
        <div className="growingLine"> Do Run 메이트와 함께 달리며 </div>
        <div className="growingLine">
          {' '}
          어느새 성장해있는 나의 실력을 확인하세요!{' '}
        </div>
      </div>
      <div className="growingPicWrapper">
        <img className="growing" src={grow} ref={growing} />
        <div className="medalBackWrapper">
          <img className="medalBack" src={medalsBack} ref={medalBackIMG}></img>
        </div>
        <div className="medals">
          <img className="medal" ref={medalFirst} src={medal1} />
          <img className="medal" ref={medalSecond} src={medal2} />
          <img className="medal" ref={medalThird} src={medal3} />
          <img className="medal" ref={winnerTrophy} src={winner} />
        </div>
      </div>
      <div className="topBtn" onClick={pageMovingHandler}>
        <img className="topBtnImg" src={topBtn} ref={theTopBtn} />
      </div>
    </div>
  );
}

export default Medal;
