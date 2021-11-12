import React, { useEffect, useRef } from 'react';

import './MessageList.scss';

const MessageList = ({ messages, userId }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages]);

  const renderChat = () => {
    let messageList = [];
    messages.map((el, index) => {
      const date = new Date(el.createdAt);
      const fixedDate = `${
        date.getMonth() + 1
      }-${date.getDate()} \u00a0 ${date.getHours()}:${date.getMinutes()}`;

      if (el.userId) {
        if (el.serverMsg === true) {
          messageList.push(
            <div className="message-center server-message" key={index}>
              <div className="message-content">
                <div className="message-text">{el.message}</div>
                <div className="message-time">{fixedDate}</div>
              </div>
            </div>
          );
        } else {
          if (el.userId === userId) {
            messageList.push(
              <div className="message-row you-message" key={index}>
                <div className="message-content">
                  <div className="message-text">{el.message}</div>
                  <div className="message-time">{fixedDate}</div>
                </div>
              </div>
            );
          } else {
            messageList.push(
              <div className="message-row other-message" key={index}>
                <div className="message-content">
                  <img src="/defaultImg.png" alt="profileImg" />
                  <div className="message-username">{el.nickname}</div>
                  <div className="message-text">{el.message}</div>
                  <div className="message-time">{fixedDate}</div>
                </div>
              </div>
            );
          }
        }
      }
    });
    return messageList;
  };

  return (
    <div id="chatMessageList">
      {renderChat()}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
