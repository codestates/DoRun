import React, { useRef, useEffect } from 'react';
import './DoChat.scss';
import doChat from './LandingSVG/doChat.gif'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(ScrollTrigger, TextPlugin);


function DoChat() {

    const dotsLeft = useRef(null);
    const dotsRight = useRef(null);
    const bubbleLeft = useRef(null);
    const bubbleRight = useRef(null);
    const chatText = useRef(null);
    const doChatGIF = useRef(null);
    const doChatBubbles = useRef(null);

    useEffect(() => {
        gsap.to(doChatGIF.current, {
            y: '30%',
            duration: 5,
            ease: 'back',
            scrollTrigger: {
                scrub: 1,
                start: '45% top',
                // markers: true,
            }
        })

        gsap.to(doChatBubbles.current, {
            y: '-50%',
            duration: 3,
            ease: 'back',
            scrollTrigger: {
                start: '45% top',
                // markers: true,
            }
        })
        gsap.to(chatText.current, {
            text: {
                value: "같은 크루의 Do Run 메이트들과 간편하게 연락을 주고 받아보세요!"
            },
            duration: 5,
            ease: "none",
            repeat: -1,
            repeatDelay: 1,
        })

        gsap.to(bubbleLeft.current, {
            y: '-40%',
            duration: 4,
            ease: 'elastic',
            repeat: -1,
        })
        gsap.to(bubbleRight.current, {
            y: '-40%',
            duration: 4,
            ease: 'elastic',
            repeat: -1,

        })



    })


    return (
        <div className="doChatWrapper">
            <div className='doChat'>
                <img className='doChatGIF' src={doChat} ref={doChatGIF} />
                <div className="doChatBubbles" ref={doChatBubbles}>
                    <div className="doChatBubbleLeft" ref={bubbleLeft}>
                        <div className="doChatBubbleLeftDots" ref={dotsLeft}>...</div>
                    </div>
                    <div className="doChatBubblesText" ref={chatText}>
                    </div>
                    <div className="doChatBubbleRight" ref={bubbleRight}>
                        <div className="doChatBubbleRightDots" ref={dotsRight}>...</div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DoChat
