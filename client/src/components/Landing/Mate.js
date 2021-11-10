import React, { useRef, useEffect } from 'react';
import './Mate.scss';
import { gsap } from "gsap";
import friends from './LandingSVG/friends.svg'
import readingGlasses from './LandingSVG/readingGlasses.svg'
import blob from './LandingSVG/blob.svg'


import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Mate() {

    const back = useRef(null);
    const line = useRef(null);
    const mate = useRef(null);
    const FAQ = useRef(null);

    useEffect(() => {

        gsap.to(back.current, {
            y: '10%',
            duration: 4,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "FAQ.current",
                start: 300,
                markers: true,
            }
        })

        gsap.to(line.current, {
            y: '120%',
            duration: 4,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "FAQ.current",
                start: 400,
            }
        });
        gsap.to(FAQ.current, {
            x: '20%',
            duration: 4,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "FAQ.current",
                start: 400,
            }
        });

        gsap.to(mate.current, {
            x: '-20%',
            duration: 4,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "mate.current",
                start: 400,
            }
        });
    });

    return (
        <>
            <div className="mateWrapper" ref={back}>
                <div className="mateText" ref={line}>
                    <div className='mateLine'> 스케줄에 얽매이지 않고 </div>
                    <div className='mateLine'> '오늘 하루만 함께' 뛰어줄 런닝 메이트가 필요하신가요?</div>
                </div>
                <div className="matePicture">
                    <img className='FAQ' ref={FAQ} src={readingGlasses} />
                    <img className='mate' ref={mate} src={friends} />
                </div>
            </div>
        </>
    )
}

export default Mate
