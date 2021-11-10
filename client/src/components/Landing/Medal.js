import React, { useRef, useEffect } from 'react';
import './Medal.scss';
import grow from './LandingSVG/growing.svg'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


function Medal() {

    var animation = gsap.timeline();

    const growing = useRef(null);
    const medal1 = useRef(null);
    const medal2 = useRef(null);
    const medal3 = useRef(null);
    const medal4 = useRef(null);

    useEffect(() => {
        gsap.to(growing.current, {
            x: '60%',
            duration: 5,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "growing.current",
                start: 3000,
            }
        });
        gsap.to(medal1.current, {
            y: '-180%',
            duration: 1.5,
            ease: "back",
            opacity: 1,
            scrollTrigger: {
                trigger: "medal1.current",
                start: 3200,
            }
        });
        gsap.to(medal2.current, {
            y: '-180%',
            duration: 2,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "medal2.current",
                start: 3200,
            }
        });
        gsap.to(medal3.current, {
            y: '-180%',
            duration: 3.5,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "medal3.current",
                start: 3200,
            }
        });
        gsap.to(medal4.current, {
            y: '-180%',
            duration: 4.5,
            ease: 'back',
            opacity: 1,
            scrollTrigger: {
                trigger: "medal4.current",
                start: 3000,
            }
        });


    })


    return (
        <div className="medalWrapper">
            <div className="growingTextWrapper">
                <div classname="growingText"> 원할 때마다 한번씩 Do Run 메이트와 달리며 </div>
                <div classname="growingText"> 어느새 성장해있는 실력을 확인하세요! </div>
            </div>
            <img className="growing" src={grow} ref={growing} />
            <div className="medals">
                <img className="medal" ref={medal1} src="https://cdn-icons.flaticon.com/png/512/2058/premium/2058935.png?token=exp=1636530229~hmac=047756b793dba49b6a54ddcd4a50d1dc" />
                <img className="medal" ref={medal2} src="https://cdn-icons.flaticon.com/png/512/2058/premium/2058941.png?token=exp=1636530243~hmac=2063230db820b3478647974cc69cdb36" />
                <img className="medal" ref={medal3} src="https://cdn-icons.flaticon.com/png/512/2058/premium/2058945.png?token=exp=1636530289~hmac=11cc8e2d7d55b65b7674d82628287864" />
                <img className="medal" ref={medal4} src="https://cdn-icons.flaticon.com/png/512/2058/premium/2058923.png?token=exp=1636530216~hmac=22dfa926616d7b91a78bd3537a6d979e" />
            </div>
        </div>
    )
}

export default Medal
