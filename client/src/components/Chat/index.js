import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader/ChatHeader';
import './ChatShell.scss';
import Input from './Input/Input';
import MessageList from './MessageList/MessageList';
import SideBar from './SideBar/SideBar';
import io from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_SERVER}`);

const Chat = () => {
  const userCrewId = Number(sessionStorage.getItem('userCrewId'));
  const userId = Number(sessionStorage.getItem('userId'));
  const nickname = sessionStorage.getItem('userNickname');
  const [socketMsg, setSocketMsg] = useState({
    userId: '',
    nickname: '',
    message: '',
    createdAt: '',
    serverMsg: '',
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', userCrewId, userId, nickname);
    socket.emit('getAllMessages', userId, userCrewId);
    socket.on('getAllMessages', (data) => {
      setMessages([...data]);
    });
  }, []);

  useEffect(() => {
    socket.on(
      'recvMessage',
      (userId, nickname, message, chatCreatedAt, serverMsg) => {
        // console.log(userId, nickname, message, chatCreatedAt);
        setSocketMsg({
          userId: userId,
          nickname: nickname,
          message: message,
          createdAt: chatCreatedAt,
          serverMsg: serverMsg,
        });
      }
    );
  }, []);

  useEffect(() => {
    if (socketMsg.message) {
      setMessages([...messages, socketMsg]);
    }
  }, [socketMsg]);

  return (
    <div id="chatContainer" className="chatWrapper">
      <ChatHeader />
      <div className="chatMain">
        <SideBar userCrewId={userCrewId} />
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
