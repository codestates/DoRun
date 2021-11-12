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
            duration: 3,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                scrub: 3,
                start: '65% top',
                // markers: true,
            }
        });
        gsap.to(medalFirst.current, {
            y: '-80%',
            duration: 24,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                scrub: 1,
                start: '68% top',
            }
        });
        gsap.to(medalSecond.current, {
            y: '-80%',
            duration: 48,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                scrub: 1,
                start: '70% top',
            }
        });
        gsap.to(medalThird.current, {
            y: '-80%',
            duration: 72,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                scrub: 1,
                start: '72% top',
            }
        });
        gsap.to(winnerTrophy.current, {
            y: '-80%',
            duration: 96,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                scrub: 1,
                start: '74% top',
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
