import React from 'react';
import Message from '../Message';

import './MessageList.scss';

const MessageList = ({ messages, nickname }) => {
  const renderChat = messages.map((el, index) => {
    return el.nickname === nickname ? (
      <div className="message-row you-message" key={index}>
        <div className="message-content">
          <div className="message-text">{el.message}</div>
          <div className="message-time">{el.createdAt}</div>
        </div>
      </div>
    ) : (
      <div className="message-row other-message" key={index}>
        <div className="message-content">
          <img src="/defaultImg.png" alt="Daryl Duckmanton" />
          <div className="message-username">{el.nickname}</div>
          <div className="message-text">{el.message}</div>
          <div className="message-time">{el.createdAt}</div>
        </div>
      </div>
    );
  });

  return <div id="chatMessageList">{renderChat}</div>;
};

export default MessageList;
