import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import Message from '../Message';

import './MessageList.scss';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');

const MessageList = ({ nickname }) => {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('recvMessage', ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  }, []);

  const renderChat = () => {
    return chat.map((el, index) => {
      el.name === nickname ? (
        <div className="message-row you-message" key={index}>
          <div className="message-content">
            <div className="message-text">{el.message}</div>
            <div className="message-time">Nov 3</div>
          </div>
        </div>
      ) : (
        <div className="message-row other-message" key={index}>
          <div className="message-content">
            <img src="/defaultImg.png" alt="Daryl Duckmanton" />
            <div className="message-username">{el.name}</div>
            <div className="message-text">{el.message}</div>
            <div className="message-time">Nov 3</div>
          </div>
        </div>
      );
    });
  };

  return <div id="chatMessageList">{renderChat()}</div>;
};

export default MessageList;
