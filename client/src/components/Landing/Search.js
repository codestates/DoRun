import React, { useRef, useEffect } from 'react';
import './Search.scss';
import map from './LandingSVG/map.svg'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


function Search() {
    const search = useRef(null);

    useEffect(() => {
        gsap.to(search.current, {
            x: '20%',
            duration: 5,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "search.current",
                start: 1200,
            }
        });
    });

    return (
        <>
            <div className="searchWrapper">
                <img className="search" src={map} ref={search} />
            </div>
        </>
    )
}

export default Search
