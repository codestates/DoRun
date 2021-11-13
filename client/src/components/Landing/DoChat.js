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
    const chatText = useRef(null);

    useEffect(() => {
        gsap.to(dotsLeft.current, {
            y: '-100%',
            duration: 3,
            ease: 'elastic',
            opacity: 1,
            repeat: -1,
        });

        gsap.to(dotsRight.current, {
            y: '-100%',
            duration: 3,
            ease: 'elastic',
            opacity: 1,
            repeat: -1,
        });

        gsap.to(chatText.current, {
            text: {
                value: "같은 크루의 Do Run 메이트들과 간편하게 연락을 주고 받아보세요!"
            },
            duration: 5,
            ease: "none",
            repeat: -1,
            repeatDelay: 1,
        })



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
