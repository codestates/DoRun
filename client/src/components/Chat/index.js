import React from 'react';
import ChatHeader from './ChatHeader/ChatHeader';
import './ChatShell.scss';
import Input from './Input/Input';
import MessageList from './Message/MessageList/MessageList';
import SideBar from './SideBar/SideBar';

const Chat = () => {
  return (
    <div id="chatContainer" className="chatWrapper">
      <ChatHeader />
      <div className="chatMain">
        <SideBar />
        <MessageList />
      </div>
      <Input />
    </div>
  );
};

export default Chat;
