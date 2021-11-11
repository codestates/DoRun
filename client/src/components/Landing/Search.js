import React, { useRef, useEffect } from 'react';
import './Search.scss';
import map from './LandingSVG/map.svg'
import search from './LandingSVG/search2.gif'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


function Search() {
    const searchGIF = useRef(null);
    const searchMate = useRef(null);
    const searchText = useRef(null);


    useEffect(() => {
        gsap.to(searchGIF.current, {
            y: '20%',
            duration: 2,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "searchGIF.current",
                start: 1600,
            }
        });
        gsap.to(searchMate.current, {
            x: '-30%',
            duration: 3,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "searchMate.current",
                start: 1650,
            }
        });
        gsap.to(searchText.current, {
            x: '20%',
            duration: 3,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "searchText.current",
                start: 1650,
            }
        });


    });

    return (
        <>
            <div className="searchWrapper">
                <div className="searchGIFWrapper">
                    <img className='searchGIF' src={search} ref={searchGIF} />
                </div>
                <div className="searchContentWrapper">
                    <div className="searchContentText" ref={searchText}>
                        <div className="searchContentLine">손 안에 핸드폰만 있으면</div>
                        <div className="searchContentLine">언제 어디서든 함께 뛰어줄</div>
                        <div className="searchContentLine">Do Run 메이트를 만날 수 있습니다!</div>
                    </div>
                    <img className="search" src={map} ref={searchMate} />
                </div>
            </div>
        </>
    )
}

export default Search
