import React, { useRef, useEffect } from 'react';
import './DoChat.scss';
import doChat from './LandingSVG/doChat.gif'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function DoChat() {

    const dotsLeft = useRef(null);
    const dotsRight = useRef(null);
    const chatText = useRef(null);

    useEffect(() => {
        gsap.to(dotsLeft.current, {
            y: '-100%',
            duration: 3,
            ease: 'elastic',
            opacity: 1,
            scrollTrigger: {
                scrub: 1,
                start: '60% top',
            }
        });

        gsap.to(dotsRight.current, {
            y: '-100%',
            duration: 3,
            ease: 'elastic',
            opacity: 1,
            scrollTrigger: {
                scrub: 1,
                start: '60% top',
            }
        });

        gsap.to(chatText.current, {
            y: '-80%',
            duration: 3,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                scrub: 1,
                start: '60% top',
                markers: true,
            }
        });


    })


    return (
        <div className="doChatWrapper">
            <div className='doChat'>
                <img className='doChatGIF' src={doChat} />
                <div className="doChatBubbles">
                    <div className="doChatBubbleLeft" >
                        <div className="doChatBubbleLeftDots" ref={dotsLeft}>...</div>
                    </div>
                    <div className="doChatBubblesText" ref={chatText}>
                        <div className="doChatBubblesLine"> 크루의 Do Run 메이트들과</div>
                        <div className="doChatBubblesLine"> 간편하게 연락을 주고 받을 수도 있습니다</div>
                    </div>
                    <div className="doChatBubbleRight">
                        <div className="doChatBubbleRightDots" ref={dotsRight}>...</div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DoChat
