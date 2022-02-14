import React, { useRef, useEffect } from 'react';
import './Search.scss';
import map from './LandingSVG/map.svg';
import search from './LandingSVG/search2.gif';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function Search() {
  const searchGIF = useRef(null);
  const searchMate = useRef(null);
  const searchText = useRef(null);
  const searchLeft = useRef(null);
  const searchRight = useRef(null);

  useEffect(() => {
    gsap.to(searchGIF.current, {
      y: '55%',
      duration: 2,
      ease: 'back',
      opacity: 1,
      scrollTrigger: {
        scrub: 1.5,
        start: '10% top',
      },
    });
    gsap.to(searchLeft.current, {
      x: '10%',
      duration: 3,
      ease: 'back',
      opacity: 3,
      scrollTrigger: {
        scrub: 3,
        start: 'top top',
      },
    });
    gsap.to(searchRight.current, {
      x: '-10%',
      duration: 3,
      ease: 'back',
      opacity: 1,
      scrollTrigger: {
        scrub: 3,
        start: '10% top',
      },
    });
    gsap.to(searchMate.current, {
      x: '-35%',
      duration: 1,
      ease: 'back',
      opacity: 1,
      scrollTrigger: {
        scrub: 1.5,
        start: '10% top',
      },
    });
    gsap.to(searchText.current, {
      x: '20%',
      duration: 1,
      ease: 'back',
      opacity: 1,
      scrollTrigger: {
        scrub: 1.5,
        start: '10% top',
      },
    });
  });

  return (
    <>
      <div className="searchWrapper">
        <div className="searchGIFWrapper">
          <img className="searchGIF" src={search} ref={searchGIF} />
        </div>
        <div className="searchGIFWrapperBack">
          <div className="searchLeft" ref={searchLeft}>
            여의도 한강공원, 망원역 1번 출구, 서리풀 공원
          </div>
          <div className="searchRight" ref={searchRight}>
            합정역 4번 출구, 도림천, 한강공원 광나루 지구
          </div>
        </div>
        <div className="searchContentWrapper">
          <div className="searchContentText" ref={searchText}>
            <div className="searchContentLine">손 안에 핸드폰만 있으면</div>
            <div className="searchContentLine">언제 어디서든 함께 뛰어줄</div>
            <div className="searchContentLine">
              Do Run 메이트를 만날 수 있습니다!
            </div>
          </div>
          <img className="search" src={map} ref={searchMate} />
        </div>
      </div>
    </>
  );
}

export default Search;
