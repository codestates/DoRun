import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader/ChatHeader';
import './ChatShell.scss';
import Input from './Input/Input';
import MessageList from './Message/MessageList/MessageList';
import SideBar from './SideBar/SideBar';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

const Chat = () => {
  // const userCrewId = sessionStorage.getItem('userCrewId');
  const userCrewId = 30;
  const [nickname, setNickname] = useState('test');

  useEffect(() => {
    socket.emit('joinRoom', userCrewId);
  }, []);
  return (
    <div id="chatContainer" className="chatWrapper">
      <ChatHeader />
      <div className="chatMain">
        <SideBar />
        <MessageList nickname={nickname} />
      </div>
      <Input nickname={nickname} />
    </div>
  );
};

export default Chat;
