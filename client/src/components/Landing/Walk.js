import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Walk.scss';
import walk from './LandingSVG/walk.svg';
import { gsap } from "gsap";
gsap.registerPlugin(ScrollTrigger);
import { ScrollTrigger } from "gsap/ScrollTrigger";


function Walk() {

    const run = useRef(null);
    const line = useRef(null);

    useEffect(() => {

        gsap.to(run.current, {
            x: '20%',
            duration: 5,
            ease: 'back',
            opacity: 1,
            repeat: -1,
            repeatDelay: 2,
        });

        gsap.to(line.current, {
            y: '-50%',
            duration: 5,
            ease: 'back',
            opacity: 1,
            repeat: -1,
            repeatDelay: 2,
        });

    });

    const history = useHistory();
    const pagehandler = () => {
        history.push('/map')
    }



    return (
        <>
            <div className='walkWrapper'>
                <img className='walk' src={walk} ref={run} />
                <div className='walkInfo' ref={line} >
                    <div className='line' > 혼자 뛰기 심심할 때, </div>
                    <div className='line' > '오늘만 함께 할' </div>
                    <div className='line' > Do Run 메이트를 만들어보세요! </div>
                    <div className='walkBtn' onClick={pagehandler}> Do Run!! </div>

                </div>
            </div>
        </>
    )
}

export default Walk;
