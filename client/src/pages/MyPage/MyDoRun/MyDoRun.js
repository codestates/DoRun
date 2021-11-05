import './MyDoRun.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const MyDoRun = ({ dorunInfo }) => {

  const currentUserId = sessionStorage.getItem('userId');

  const crewSignout = async () => {
    axios.delete(`http://localhost:3001/crew/${currentUserId}`)
      .then((res) => {
        // console.log('크루 탈퇴 요청에 대한 응답입니다', res)
        if (res.data.message === 'success') {
          sessionStorage.setItem('userCrewId', 'null')
          location.reload()
        }
      })
      .catch(e => console.log(e))
  }




  return (
    <>
      <div className="myDoRunForm">
        <div className="myDoRunInfo">
          <div className="myDoRunList">
            <div className='title'>
              {dorunInfo.title}
            </div>
          </div>
          <div className="myDoRunList">
            <div className="listCategory"> 출발지 </div>
            <div className="dapatture"> {dorunInfo.departure} </div>
          </div>
          <div className="myDoRunList">
            <div className="listCategory"> 시간 </div>
            <div className="time"> {dorunInfo.time} </div>
          </div>
          <div className="myDoRunList">
            <div className="listCategory"> 인원 </div>
            <div className="personnel" > {dorunInfo.perssonel} </div>
          </div>
          <div className="myDoRunList">
            <div className="listCategory"> 난이도 </div>
            <div className="level"> {dorunInfo.level} </div>
          </div>
          <div className="myDoRunList">
            <div className="listCategory"> 거리 </div>
            <div className="distance"> {dorunInfo.distance} </div>
          </div>
          <div className="myDoRunList">
            <div className="listCategory"> 세부사항 </div>
            <div className="Desc"> {dorunInfo.desc} </div>
          </div>
        </div>
        {sessionStorage.getItem('userCrewId') === null ?
          ''
          :
          <div className="goOutMyDorun">
            <div className="crewSigout" onClick={crewSignout}>
              크루 나가기
            </div>
            <Link to="/chat">
              <div className="crewChat">Do Chat!!</div>
            </Link>
          </div>
        }
      </div>
    </>
  );
};

export default MyDoRun;
