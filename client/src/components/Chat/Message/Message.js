import React from 'react';
import './Message.scss';

const Message = () => {
  return (
    <>
      <div className="message-row other-message">
        <div className="message-content">
          <img src="/defaultImg.png" alt="Daryl Duckmanton" />
          <div className="message-username">나도멋지게달리고싶다</div>
          <div className="message-text">
            안녕하세요! 제가 처음이라 걱정되는데 잘 할 수 있겠죠?
          </div>
          <div className="message-time">Nov 3</div>
        </div>
      </div>

      <div className="message-row you-message">
        <div className="message-content">
          <div className="message-text">안녕하세요~!</div>
          <div className="message-time">Nov 3</div>
        </div>
      </div>
    </>
  );
};

export default Message;
