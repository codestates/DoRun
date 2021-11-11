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

    useEffect(() => {
        gsap.to(growing.current, {
            x: '60%',
            duration: 5,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "growing.current",
                start: 3700,
                // markers: true,
            }
        });
        gsap.to(medalFirst.current, {
            y: '-410%',
            duration: 5.5,
            ease: "back",
            opacity: 1,
            scrollTrigger: {
                trigger: "medalFirst.current",
                start: 3750,
            }
        });
        gsap.to(medalSecond.current, {
            y: '-410%',
            duration: 6,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "medalSecond.current",
                start: 3750,
            }
        });
        gsap.to(medalThird.current, {
            y: '-410%',
            duration: 6.5,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "medalThird.current",
                start: 3800,
            }
        });
        gsap.to(winnerTrophy.current, {
            y: '-410%',
            duration: 7,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "winnerTrophy.current",
                start: 3800,
            }
        });


    })


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
        </div>
    )
}

export default Medal
