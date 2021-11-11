import React, { useRef, useEffect } from 'react';
import './Create.scss';
import create from './LandingSVG/createNew.gif';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Join() {
    const joinGIF = useRef(null);
    const joinText = useRef(null);


    useEffect(() => {
        gsap.to(joinGIF.current, {
            y: '-80%',
            duration: 3,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "joinGIF.current",
                start: 2100,
                // markers: true,
            }
        });
        gsap.to(joinText.current, {
            y: '50%',
            duration: 3,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "joinText.current",
                start: 2100,
            }
        });




    })
    return (
        <div className="joinWrapper">
            <div className='join'>
                <img className='joinGIF' src={create} ref={joinGIF} />
                <div className='joinContenText' ref={joinText}>
                    <div className='joinContenLine' > 내가 원하는 곳에서 얼마나 달릴지</div>
                    <div className='joinContenLine' > 쉽고 빠르게 Do Run 크루를 만들고</div>
                    <div className='joinContenLine' > Do Run 메이트를 모집할 수도 있습니다!</div>
                </div>
            </div>
        </div>
    )
}

export default Join