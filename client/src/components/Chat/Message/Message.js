import React from 'react';
import './Message.scss';

const Message = () => {
  return (
    <>
      <div class="message-row other-message">
        <div class="message-content">
          <img src="/defaultImg.png" alt="Daryl Duckmanton" />
          <div class="message-username">나도멋지게달리고싶다</div>
          <div class="message-text">
            안녕하세요! 제가 처음이라 걱정되는데 잘 할 수 있겠죠?
          </div>

          <div class="message-time">Nov 3</div>
        </div>
      </div>
      <div class="message-row you-message">
        <div class="message-content">
          <div class="message-text">안녕하세요~!</div>
          <div class="message-time">Nov 3</div>
        </div>
      </div>
    </>
  );
};

export default Message;
