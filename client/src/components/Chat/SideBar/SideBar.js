import React, { useState, useEffect } from 'react';
import './SideBar.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faUsers,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

const SideBar = ({ userCrewId }) => {
  const [crewData, setCrewData] = useState({
    title: '',
    member: [],
  });

  const crewMember = () => {
    let crewMembers = [];
    crewData.member.map((el, index) => {
      crewMembers.push(
        <li className="userOne" key={index}>
          <FontAwesomeIcon icon={faCheck} style={{ marginRight: '10px' }} />
          {el.id}
        </li>
      );
    });
    return crewMembers;
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/crew/${userCrewId}`).then((res) => {
      setCrewData({
        title: res.data.data.title,
        member: [...res.data.CrewInUser],
      });
    });
  }, []);

  return (
    <>
      <div className="chatSidebar">
        <h3 className="crewInfo crewName">
          <FontAwesomeIcon icon={faComments} /> Crew Name
        </h3>
        <h2 id="crewName">{crewData.title}</h2>
        <h3 className="crewInfo crewUsers">
          <FontAwesomeIcon icon={faUsers} /> Users
        </h3>
        <ul id="users" className="crewUsers">
          {crewMember()}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
