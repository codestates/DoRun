import React from 'react';
import './test.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRunning,
  faComments,
  faSignInAlt,
  faUsers,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

const test = () => {
  return (
    <div className="chat_container">
      <header className="chat_header">
        <h1 className="chat_title">
          <FontAwesomeIcon icon={faRunning} /> DoRun
        </h1>
        <a href="/" class="exit">
          <FontAwesomeIcon icon={faSignInAlt} />
        </a>
      </header>
      <main class="chat_main">
        <div class="chat_sidebar">
          <h3 className="room-name">
            <FontAwesomeIcon icon={faComments} /> Crew Name
          </h3>
          <h2 id="room-name">여의도 10km 함께 뛰어요~!</h2>
          <h3 className="crew-users">
            <FontAwesomeIcon icon={faUsers} /> Users
          </h3>
          <ul id="users" className="crew-users">
            <li>여의도 DoRun쟁이</li>
            <li>나도멋지게달리고싶다</li>
            <li>목표는 마라톤 완주</li>
          </ul>
        </div>
        {/* 채팅 메세지 리스트 */}
        {/* <div class="chat_messages">
          <img class="chat_user-photo" src="/defaultImg.png" />
          <div class="chat_message">
            <p class="meta">
              여의도 DoRun쟁이 <span>9:12pm</span>
            </p>
            <p class="text">10km 완주 가능할까요?</p>
          </div>
          <div class="chat_message">
            <p class="meta">
              나도멋지게달리고싶다 <span>9:15pm</span>
            </p>
            <p class="text">
              천천히 뛰는 거라 크게 어렵지 않을 거예요! 같이 하면 오히러 더 쉽게
              완주하실 수 있습니다~!
            </p>
          </div>
        </div> */}

        {/* 채팅 메세지 */}
        <div id="chat-message-list">
          <div class="message-row you-message">
            <div class="message-content">
              <div class="message-text">abc</div>
              <div class="message-time">Nov 3</div>
            </div>
          </div>
          <div class="message-row other-message">
            <div class="message-content">
              <img src="/defaultImg.png" alt="Daryl Duckmanton" />
              <div class="message-text">123</div>
              <div class="message-time">Nov 3</div>
            </div>
          </div>
          <div class="message-row you-message">
            <div class="message-content">
              <div class="message-text">agsdfaewfewaf</div>
              <div class="message-time">Nov 3</div>
            </div>
          </div>
          <div class="message-row other-message">
            <div class="message-content">
              <img src="/defaultImg.png" alt="Daryl Duckmanton" />
              <div class="message-text">dddddddddddd</div>
              <div class="message-time">Nov 3</div>
            </div>
          </div>
          <div class="message-row you-message">
            <div class="message-content">
              <div class="message-text">dfdfeff!~!</div>
              <div class="message-time">Nov 3</div>
            </div>
          </div>
          <div class="message-row other-message">
            <div class="message-content">
              <img src="/defaultImg.png" alt="Daryl Duckmanton" />
              <div class="message-text">asdfqwerasdfqwer</div>
              <div class="message-time">Nov 3</div>
            </div>
          </div>
          <div class="message-row you-message">
            <div class="message-content">
              <div class="message-text">넵~!~!</div>
              <div class="message-time">Nov 3</div>
            </div>
          </div>
          <div class="message-row other-message">
            <div class="message-content">
              <img src="/defaultImg.png" alt="Daryl Duckmanton" />
              <div class="message-text">
                알겠습니다! 잠시 후에 여의도 한강 공원에서 만나요 :)
              </div>
              <div class="message-time">Nov 3</div>
            </div>
          </div>
          <div class="message-row you-message">
            <div class="message-content">
              <div class="message-text">
                천천히 진행할 거라 크게 어렵진 않을 거예요! 같이하면 오히려 쉽게
                완주하실 수 있습니다!
              </div>
              <div class="message-time">Nov 3</div>
            </div>
          </div>
          <div class="message-row other-message">
            <div class="message-content">
              <img src="/defaultImg.png" alt="Daryl Duckmanton" />
              <div class="message-text">
                안녕하세요! 제가 처음이라 걱정되는데 잘 할 수 있겠죠?
              </div>
              <div class="message-time">Nov 3</div>
            </div>
          </div>
          <div class="message-row you-message">
            <div class="message-content">
              <div class="message-text">안녕하세요~!</div>
              <div class="message-time">Nov 3</div>
            </div>
          </div>
        </div>
      </main>
      <div class="chat_form-container">
        <form id="chat_form">
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autocomplete="off"
          />
          <button class="btn">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default test;
