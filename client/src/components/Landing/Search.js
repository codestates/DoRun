import React, { useRef, useEffect } from 'react';
import './Search.scss';
import map from './LandingSVG/map.svg'
import search from './LandingSVG/search.gif'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


function Search() {
    const searchGIF = useRef(null);
    const searchMate = useRef(null);

    useEffect(() => {
        gsap.to(search.current, {
            x: '20%',
            duration: 5,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "searchMate.current",
                start: 1200,
            }
        });
        gsap.to(searchGIF.current, {
            x: '20%',
            duration: 5,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "searchGIF.current",
                start: 1200,
            }
        });
    });

    return (
        <>
            <div className="searchWrapper">
                <img className='searchGIF' src={search} ref={searchGIF} />
                <img className="search" src={map} ref={searchMate} />
            </div>
        </>
    )
}

export default Search
