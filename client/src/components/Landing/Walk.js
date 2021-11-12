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

        // var tl = gsap.timeline({ repeat: 10, repeatDelay: 1 });

        // tl.from(run.current, {
        //     x: '20%',
        //     duration: 1,
        //     ease: 'back',
        //     opacity: 1,
        // })
        // tl.to(run.current, {
        //     x: '120%',
        //     duration: 3,
        // })


        gsap.to(run.current, {
            x: '20%',
            duration: 5,
            ease: 'back',
            opacity: 1,
            // scrollTrigger: {
            //     scrub: 1,
            //     start: "top",
            //     markers: true,
            // }
        });

        gsap.to(line.current, {
            y: '-50%',
            duration: 5,
            ease: 'back',
            opacity: 1,
            // scrollTrigger: {
            //     scrub: 1,
            //     start: "0px",
            // }
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
