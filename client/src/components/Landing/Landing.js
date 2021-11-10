import React from 'react';
import Walk from './Walk'
import Mate from './Mate';
import Search from './Search';
import Join from './Join';
import DoChat from './DoChat';
import Medal from './Medal';

const Landing = () => {




  return (
    <>
      <div className="top">
        <Walk />
        <Mate />
        <Search />
        <Join />
        <DoChat />
        <Medal />
      </div>
    </>
  );
};

export default Landing;
