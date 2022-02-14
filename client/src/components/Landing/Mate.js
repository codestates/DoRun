import React, { useRef, useEffect } from 'react';
import './Mate.scss';
import friends from './LandingSVG/friends.svg';
import readingGlasses from './LandingSVG/readingGlasses.svg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function Mate() {
  const back = useRef(null);
  const line = useRef(null);
  const mate = useRef(null);
  const FAQ = useRef(null);

  useEffect(() => {
    gsap.config({ nullTargetWarn: false });

    gsap.to(back.current, {
      y: '10%',
      duration: 1,
      ease: 'back',
      opacity: 1,
      scrollTrigger: {
        scrub: 1.5,
        start: '50 top',
      },
    });

    gsap.to(line.current, {
      y: '120%',
      duration: 1,
      ease: 'back',
      opacity: 1,
      scrollTrigger: {
        scrub: 1.5,
      },
    });
    gsap.to(FAQ.current, {
      x: '40%',
      duration: 1,
      ease: 'back',
      opacity: 1,
      scrollTrigger: {
        scrub: 1.5,
      },
    });

    gsap.to(mate.current, {
      x: '-40%',
      duration: 4,
      ease: 'back',
      opacity: 1,
      scrollTrigger: {
        scrub: 1.5,
      },
    });
  });

  return (
    <>
      <div className="mateWrapper" ref={back}>
        <div className="mateText" ref={line}>
          <div className="mateLine"> 스케줄에 얽매이지 않고 </div>
          <div className="mateLine">
            {' '}
            '오늘 하루만 함께' 뛰어줄 런닝 메이트가 필요하신가요?
          </div>
        </div>
        <div className="matePicture">
          <img className="FAQ" ref={FAQ} src={readingGlasses} />
          <img className="mate" ref={mate} src={friends} />
        </div>
      </div>
    </>
  );
}

export default Mate;
