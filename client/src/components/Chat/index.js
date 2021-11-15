import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChatHeader from './ChatHeader/ChatHeader';
import './ChatShell.scss';
import Input from './Input/Input';
import MessageList from './MessageList/MessageList';
import SideBar from './SideBar/SideBar';
import io from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_SERVER}`, {
  transports: ['websocket'],
});

const Chat = () => {
  const userId = useSelector((state) => state.user.userId);
  const userCrewId = useSelector((state) => state.user.userCrewId);
  const nickname = useSelector((state) => state.user.nickname);
  const [socketMsg, setSocketMsg] = useState({
    userId: '',
    nickname: '',
    message: '',
    createdAt: '',
    serverMsg: '',
    profileImg: '',
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', userCrewId, userId, nickname);
    socket.emit('getAllMessages', userId, userCrewId);
    socket.on('getAllMessages', (data) => {
      console.log(data);
      setMessages([...data]);
    });
  }, []);

  useEffect(() => {
    socket.on('recvMessage', (data) => {
      setSocketMsg({
        userId: data.userId,
        nickname: data.nickname,
        message: data.message,
        createdAt: data.createdAt,
        serverMsg: data.serverMsg,
        profileImg: data.image,
      });
    });
  }, []);
  useEffect(() => {
    console.log(messages);
    if (socketMsg.message) {
      setMessages([...messages, socketMsg]);
    }
  }, [socketMsg]);

  return (
    <div id="chatContainer" className="chatWrapper">
      <ChatHeader />
      <div className="chatMain">
        <SideBar userCrewId={userCrewId} socketMsg={socketMsg} />
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
