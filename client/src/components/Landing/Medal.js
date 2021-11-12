import React, { useRef, useEffect } from 'react';
import './Medal.scss';
import grow from './LandingSVG/growing.svg';
import medal1 from './LandingSVG/medal1.png';
import medal2 from './LandingSVG/medal2.png';
import medal3 from './LandingSVG/medal3.png';
import winner from './LandingSVG/winner.png';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);



function Medal() {
  const growing = useRef(null);
  const medalFirst = useRef(null);
  const medalSecond = useRef(null);
  const medalThird = useRef(null);
  const winnerTrophy = useRef(null);
  const topBtn1 = useRef(null);
  const topBtn2 = useRef(null);
  const topBtn3 = useRef(null);

  useEffect(() => {


    gsap.to(growing.current, {
      x: "60%",
      duration: 4,
      scrollTrigger: {
        scrub: 1,
        start: '65% top',
        // markers: true,
      }
    });

    gsap.to(medalFirst.current, {
      y: '-70%',
      duration: 5,
      ease: 'back',
      opacity: 1,
      scrollTrigger: {
        scrub: 1,
        start: '65% top',
        // markers: true,
      }
    });
    gsap.to(medalSecond.current, {
      y: '-70%',
      duration: 6,
      ease: 'back',
      opacity: 1,
      scrollTrigger: {
        scrub: 1,
        start: '67% top',
        // markers: true,
      }
    });
    gsap.to(medalThird.current, {
      y: '-70%',
      duration: 7,
      ease: 'back',
      opacity: 1,
      scrollTrigger: {
        scrub: 1,
        start: '69% top',
        // markers: true,
      }
    });
    gsap.to(winnerTrophy.current, {
      y: '-70%',
      duration: 8,
      ease: 'back',
      opacity: 1,
      scrollTrigger: {
        scrub: 1,
        start: '71% top',
        // markers: true,
      }
    });


    gsap.to(topBtn1.current, {
      y: '-255%',
      duration: 10,
      ease: 'back',
      opacity: 1,
      scrollTrigger: {
        scrub: 1,
        start: '79% top',
        // markers: true,
      }
    });


    gsap.to(topBtn2.current, {
      y: '85%',
      duration: 4,
      ease: 'back',
      opacity: 1,
      scrollTrigger: {
        scrub: 1,
        start: '75% top',
        // markers: true,
      }
    });

    gsap.to(topBtn3.current, {
      y: '85%',
      duration: 4,
      ease: 'back',
      opacity: 1,
      scrollTrigger: {
        scrub: 1,
        start: '75% top',
        // markers: true,
      }
    });


  });




  const pageMovingHandler = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }



  return (
    <div className="medalWrapper">
      <div className="growingTextWrapper">
        <div className="growingLine"> 원할 때마다 한번씩 Do Run 메이트와 달리며 </div>
        <div className="growingLine"> 어느새 성장해있는 실력을 확인하세요! </div>
      </div>
      <div className="growingPicWrapper">
        <img className="growing" src={grow} ref={growing} />
        <div className="medals">
          <img className="medal" ref={medalFirst} src={medal1} />
          <img className="medal" ref={medalSecond} src={medal2} />
          <img className="medal" ref={medalThird} src={medal3} />
          <img className="medal" ref={winnerTrophy} src={winner} />
        </div>
      </div>
      <div className="topBtn" onClick={pageMovingHandler}>
        <div className="topBtnLine1" ref={topBtn1}> ▲ </div>
        <div className="topBtnLine2" ref={topBtn2}> Let's </div>
        <div className="topBtnLine3" ref={topBtn3}> Do Run ?</div>
      </div>
    </div>
  )
}

export default Medal
