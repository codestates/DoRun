import React from 'react';
import './SideBar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faUsers,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
  return (
    <>
      <div className="chatSidebar">
        <h3 className="crewInfo crewName">
          <FontAwesomeIcon icon={faComments} /> Crew Name
        </h3>
        <h2 id="crewName">여의도 10km 함께 뛰어요~!</h2>
        <h3 className="crewInfo crewUsers">
          <FontAwesomeIcon icon={faUsers} /> Users
        </h3>
        <ul id="users" className="crewUsers">
          <li className="userOne">
            <FontAwesomeIcon icon={faCheck} style={{ marginRight: '10px' }} />
            여의도 DoRun쟁이
          </li>
          <li className="userOne">
            <FontAwesomeIcon icon={faCheck} style={{ marginRight: '10px' }} />
            나도멋지게달리고싶다
          </li>
          <li className="userOne">
            <FontAwesomeIcon icon={faCheck} style={{ marginRight: '10px' }} />
            목표는 마라톤 완주
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
