import React from 'react';
import './ChatHeader.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const ChatHeader = () => {
  return (
    <>
      <div className="chatHeader">
        <h1 className="chatTitle">
          <FontAwesomeIcon icon={faRunning} /> DoRun
        </h1>
        <a href="/" class="exit">
          <FontAwesomeIcon icon={faSignInAlt} />
        </a>
      </div>
    </>
  );
};

export default ChatHeader;
