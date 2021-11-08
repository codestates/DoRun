import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader/ChatHeader';
import './ChatShell.scss';
import Input from './Input/Input';
import MessageList from './Message/MessageList/MessageList';
import SideBar from './SideBar/SideBar';
import io from 'socket.io-client';
const ENDPOINT = 'http://localhost:3001';
let socket;

const Chat = () => {
  const userCrewId = sessionStorage.getItem('userCrewId');
  const nickname = 'user';

  const [message, setMessage] = useState({
    nickname: nickname,
    message: '',
  });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit('joinRoom', { userCrewId, nickname });
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on('getAllMessages', message.nickname);
    setMessages([...messages, message]);
  });

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message);
      setMessage({ nickname, message: '' });
    }
  };

  return (
    <div id="chatContainer" className="chatWrapper">
      <ChatHeader />
      <div className="chatMain">
        <SideBar />
        <MessageList messages={messages} nickname={nickname} />
      </div>
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;
