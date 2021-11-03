import React from 'react';
import Message from '../Message';

import './MessageList.scss';

const MessageList = () => {
  return (
    <div id="chatMessageList">
      <div className="chatStartLine">
        '목표는 마라톤 완주' 님께서 입장하였습니다.
      </div>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default MessageList;
