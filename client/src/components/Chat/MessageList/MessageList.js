import React from 'react';

import './MessageList.scss';

const MessageList = ({ messages, userId }) => {
  const renderChat = () => {
    let messageList = [];
    messages.map((el, index) => {
      if (el.userId) {
        if (el.userId === 'server') {
          messageList.push(
            <div className="message-center server-message" key={index}>
              <div className="message-content">
                <div className="message-text">{el.message}</div>
                <div className="message-time">{el.createdAt}</div>
              </div>
            </div>
          );
        } else {
          if (el.userId === userId) {
            messageList.push(
              <div className="message-row you-message" key={index}>
                <div className="message-content">
                  <div className="message-text">{el.message}</div>
                  <div className="message-time">{el.createdAt}</div>
                </div>
              </div>
            );
          } else {
            messageList.push(
              <div className="message-row other-message" key={index}>
                <div className="message-content">
                  <img src="/defaultImg.png" alt="Daryl Duckmanton" />
                  <div className="message-username">{el.nickname}</div>
                  <div className="message-text">{el.message}</div>
                  <div className="message-time">{el.createdAt}</div>
                </div>
              </div>
            );
          }
        }
      }
    });
    return messageList;
  };

  return <div id="chatMessageList">{renderChat()}</div>;
};

export default MessageList;
