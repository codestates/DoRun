import React, { useRef, useEffect } from 'react';
import './DoChat.scss';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function DoChat() {

    const dotsLeft = useRef(null);
    const dotsRight = useRef(null);
    const chatText = useRef(null);

    useEffect(() => {
        gsap.to(dotsLeft.current, {
            y: '-170%',
            duration: 3,
            ease: 'elastic',
            opacity: 1,
            scrollTrigger: {
                trigger: "dotsLeft.current",
                start: 3000,
                markers: true,
            }
        });

        gsap.to(dotsRight.current, {
            y: '-170%',
            duration: 3,
            ease: 'elastic',
            opacity: 1,
            scrollTrigger: {
                trigger: "dotsRight.current",
                start: 3000,
            }
        });

        gsap.to(chatText.current, {
            y: '140%',
            duration: 4,
            ease: 'elastic',
            opacity: 1,
            scrollTrigger: {
                trigger: "chatText.current",
                start: 3000,
            }
        });


    })


    return (
        <div className="doChatWrapper">
            <div className='doChat'>
                <div className='doChatGIF'> 채팅 gif가 들어갈 자리입니다 </div>
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
        </div>
    )
}

export default DoChat
