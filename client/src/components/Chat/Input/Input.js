import React from 'react';
import './Input.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Input = () => {
  return (
    <div className="chatFormContainer">
      <form id="chatFrm" className="chatFrm">
        <input
          className="chatMsg"
          id="chatMsg"
          type="text"
          placeholder="Enter Message"
          required
          autocomplete="off"
        />
        <button className="chatBtn" name="chatBtn">
          <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: '1.2rem' }} />
        </button>
      </form>
    </div>
  );
};

export default Input;
