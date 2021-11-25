import React from 'react';
import Walk from './Walk';
import Mate from './Mate';
import Search from './Search';
import Create from './Create';
import DoChat from './DoChat';
import Medal from './Medal';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

const Landing = () => {
  return (
    <>
      <div className="top">
        <Walk />
        <Mate />
        <Search />
        <Create />
        <DoChat />
        <Medal />
      </div>
    </>
  );
};

export default Landing;
