import React, { useState } from 'react';
import './Input.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const isMessageEmpty = (textMessage) => {
  return adjustTextMessage(textMessage).length === 0;
};

const adjustTextMessage = (textMessage) => {
  return textMessage.trim();
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  if (!isMessageEmpty(textMessage)) {
    // onMessageSubmitted(textMessage);
    setTextMessage('');
  }
};

const Input = () => {
  const [textMessage, setTextMessage] = useState('');
  const disableBtn = isMessageEmpty(textMessage);

  // emoji
  const [showEmojis, setShowEmojis] = useState(false);

  const addEmoji = (e) => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setTextMessage(textMessage + emoji);
  };

  return (
    <div className="chatFormContainer">
      <form id="chatFrm" className="chatFrm" onSubmit={handleFormSubmit}>
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
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          className="chatMsg"
          id="chatMsg"
          type="text"
          placeholder="Enter Message"
          autoComplete="off"
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
        <button className="chatBtn" name="chatBtn" disabled={disableBtn}>
          <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: '1.3rem' }} />
        </button>
      </form>
    </div>
  );
};

export default Input;
