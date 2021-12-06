import React from 'react';
import './CrewSignout.scss';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { withdrawalCrew } from '../../../_actions/crew_action';
axios.defaults.withCredentials = true;

function CrewSignout({ crewSignoutOpen, setCrewSignoutOpen }) {
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  const closeCrewSignout = () => {
    if (crewSignoutOpen === true) {
      setCrewSignoutOpen(false);
    }
  };
  const crewSignoutHandler = () => {
    dispatch(withdrawalCrew(userId))
      .then((res) => {
        if (res.payload.data.message === 'success') {
          location.reload();
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="crewSignout">
      크루 나가기
      {crewSignoutOpen ? (
        <div className="crewSignoutModal">
          <div className="closeCrewSignoutModal" onClick={closeCrewSignout}>
            &times;
          </div>
          <div className="crewSignoutModalNotice">
            참여한 크루에서 나가시겠습니까?
          </div>
          <div className="crewSignoutModalBtn" onClick={crewSignoutHandler}>
            네, 현재 크루를 나가겠습니다
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default CrewSignout;
