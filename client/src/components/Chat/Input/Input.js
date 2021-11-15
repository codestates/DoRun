import React, { useState } from 'react';
import './Input.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const Input = ({ socket, userId, userCrewId, nickname }) => {
  const [showEmojis, setShowEmojis] = useState(false);

  const addEmoji = (e) => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setCurMsg(curMsg + emoji);
  };

  const [curMsg, setCurMsg] = useState('');
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('sendMessage', userId, userCrewId, nickname, curMsg);
    setCurMsg('');
  };

  const onTextChange = (e) => {
    setCurMsg(e.target.value);
  };

  return (
    <div className="chatFormContainer">
      <form id="chatFrm" className="chatFrm" onSubmit={sendMessage}>
        <FontAwesomeIcon
          onClick={() => setShowEmojis(!showEmojis)}
          icon={faSmile}
          style={{
            fontSize: '1.5rem',
            color: '#c5f6fa',
            margin: '7px',
            marginRight: '15px',
            marginLeft: '-5px',
            cursor: 'pointer',
          }}
        />
        <input
          value={curMsg}
          onChange={(e) => {
            onTextChange(e);
          }}
          onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
          className="chatMsg"
          id="chatMsg"
          type="text"
          placeholder="Enter Message"
          autoComplete="off"
          autoFocus
        />
        {showEmojis && (
          <div>
            <Picker
              set="twitter"
              onSelect={addEmoji}
              style={{
                position: 'absolute',
                top: '200px',
                left: '90px',
              }}
            />
          </div>
        )}
        <button className="chatBtn" name="chatBtn">
          <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: '1.3rem' }} />
        </button>
      </form>
    </div>
  );
};

export default Input;
