import React from 'react';
import './CrewSignout.scss';
import axios from 'axios';
axios.defaults.withCredentials = true;

function CrewSignout({ crewSignoutOpen, setCrewSignoutOpen }) {
  const currentUserId = sessionStorage.getItem('userId');
  const currentCrewId = sessionStorage.getItem('userCrewId');
  console.log(typeof currentCrewId);

  const closeCrewSignout = () => {
    if (crewSignoutOpen === true) {
      setCrewSignoutOpen(false);
    }
  };
  const crewSignoutHandler = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER}/crew/${currentUserId}`)
      .then((res) => {
        console.log('크루 탈퇴 요청에 대한 응답입니다', res);
        if (res.data.message === 'success') {
          sessionStorage.setItem('userCrewId', 'null');
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
            {' '}
            &times;{' '}
          </div>
          <div className="crewSignoutModalNotice">
            {' '}
            참여한 크루에서 나가시겠습니까?{' '}
          </div>
          <div className="crewSignoutModalBtn" onClick={crewSignoutHandler}>
            {' '}
            네, 현재 크루를 나가겠습니다{' '}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default CrewSignout;
