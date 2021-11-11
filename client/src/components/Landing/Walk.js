import { gsap } from "gsap";
import React, { useRef, useEffect } from 'react';
import './Walk.scss';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import walk from './LandingSVG/walk.svg';
gsap.registerPlugin(ScrollTrigger);


function Walk() {

    const run = useRef(null);
    const line = useRef(null);

    useEffect(() => {

        gsap.to(run.current, {
            x: '20%',
            duration: 4,
            ease: 'back',
            opacity: 1,

        });

        gsap.to(line.current, {
            y: '-150',
            duration: 2,
            ease: 'back',
            opacity: 1,
        });

    });

    return (
        <>
            <div className='walkWrapper'>
                <img className='walk' src={walk} ref={run} />
                <div className='walkInfo' ref={line} >
                    <div className='line' > 혼자 뛰기 심심할 때, </div>
                    <div className='line' > '오늘만 함께 할' </div>
                    <div className='line' > Do Run 메이트를 만들어보세요! </div>
                    <div className='walkBtn'> Do Run!! </div>

                </div>
            </div>
        </>
    )
}

export default Walk;
