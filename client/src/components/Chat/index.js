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
  const [socketMsg, setSocketMsg] = useState({
    userId: '',
    nickname: '',
    message: '',
    createdAt: '',
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', userCrewId, userId);
  }, []);

  useEffect(() => {
    socket.on('recvMessage', (userId, nickname, message, chatCreatedAt) => {
      console.log(userId, nickname, message, chatCreatedAt);
      setSocketMsg({
        userId: userId,
        nickname: nickname,
        message: message,
        createdAt: chatCreatedAt,
      });
    });
  }, []);

  useEffect(() => {
    setMessages([...messages, socketMsg]);
    console.log(messages);
  }, [socketMsg]);

  return (
    <div id="chatContainer" className="chatWrapper">
      <ChatHeader />
      <div className="chatMain">
        <SideBar />
        <MessageList messages={messages} userId={userId} />
      </div>
      <Input
        socket={socket}
        userId={userId}
        userCrewId={userCrewId}
        nickname={nickname}
      />
    </div>
  );
};

export default Chat;
