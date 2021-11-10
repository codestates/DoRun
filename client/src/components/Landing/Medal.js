import React, { useRef, useEffect } from 'react';
import './Medal.scss';
import grow from './LandingSVG/growing.svg'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


function Medal() {

    const growing = useRef(null);

    useEffect(() => {
        gsap.to(growing.current, {
            x: '60%',
            duration: 5,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "growing.current",
                start: 2800,
            }
        });

    })


    return (
        <div className="medalWrapper">
            <img className="growing" src={grow} ref={growing} />
            <div className="medals">
                <img className="medal1" src="https://cdn-icons-png.flaticon.com/512/2830/2830919.png" />
                <img className="medal1" src="https://cdn-icons-png.flaticon.com/512/2830/2830919.png" />
                <img className="medal1" src="https://cdn-icons-png.flaticon.com/512/2830/2830919.png" />
                <img className="medal1" src="https://cdn-icons-png.flaticon.com/512/2830/2830919.png" />
            </div>
        </div>
    )
}

export default Medal
