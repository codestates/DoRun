import React from 'react';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="loadingWrapper">
      <div className="ring">
        Loading
        <span className="loadingSpan"></span>
      </div>
    </div>
  );
};

export default Loading;
