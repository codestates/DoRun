import React, { useRef, useEffect } from 'react';
import './Create.scss';
import create from './LandingSVG/createNew.gif';
import createBack from './LandingSVG/createBack.svg'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Join() {
    const joinGIF = useRef(null);
    const joinText = useRef(null);
    const joinBack = useRef(null);


    useEffect(() => {
        gsap.to(joinGIF.current, {
            y: '40%',
            duration: 1,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                scrub: 1,
                start: '35% top',
                // markers: true,

            }
        });
        gsap.to(joinText.current, {
            y: '-60%',
            duration: 1,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                scrub: 1,
                start: '35% top',
                // markers: true,
            }
        });

        gsap.to(joinBack.current, {
            x: '70%',
            duration: 1,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                scrub: 1,
                start: '30% top',
                // markers: true,
            }
        })






    })
    return (
        <div className="joinWrapper">
            <div className='join'>
                <img className='joinGIF' src={create} ref={joinGIF} />
                <img className="joinContentBack" src={createBack} ref={joinBack} />
                <div className='joinContentText' ref={joinText}>
                    <div className='joinContentLine' > 내가 원하는 장소, 원하는 시간에 맞춰</div>
                    <div className='joinContentLine' > 쉽고 빠르게 Do Run 크루를 만들어</div>
                    <div className='joinContentLine' > 함께 뛸 메이트를 모집할 수도 있습니다!</div>
                </div>
            </div>
        </div>
    )
}

export default Join
