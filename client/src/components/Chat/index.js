import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader/ChatHeader';
import './ChatShell.scss';
import Input from './Input/Input';
import MessageList from './Message/MessageList/MessageList';
import SideBar from './SideBar/SideBar';
import io from 'socket.io-client';

const Chat = () => {
  const ENDPOINT = 'http://localhost:3001';
  const socket = io(ENDPOINT);
  const userCrewId = Number(sessionStorage.getItem('userCrewId'));
  const userId = Number(sessionStorage.getItem('userId'));
  const nickname = sessionStorage.getItem('userNickname');

  const [message, setMessage] = useState({
    nickname: nickname,
    message: '',
  });
  const [messages, setMessages] = useState([
    { nickname: 'testNick', message: 'testMsg', createdAt: 'testAt' },
    { nickname: 'q', message: 'qMsg', createdAt: 'qAt' },
  ]);

  useEffect(() => {
    socket.emit('joinRoom', userCrewId, nickname);
  }, []);

  useEffect(() => {
    socket.on('recvMessage', ({ nickname, message }, chatCreatedAt) => {
      console.log(nickname, message, chatCreatedAt);
      setMessages([...messages, { nickname, message }]);
    });
  }, [messages]);

  return (
    <div id="chatContainer" className="chatWrapper">
      <ChatHeader />
      <div className="chatMain">
        <SideBar />
        <MessageList messages={messages} nickname={nickname} />
      </div>
      <Input
        socket={socket}
        message={message}
        setMessage={setMessage}
        userCrewId={userCrewId}
        nickname={nickname}
      />
    </div>
  );
};

export default Chat;
