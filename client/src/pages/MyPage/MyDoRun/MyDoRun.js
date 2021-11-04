import './MyDoRun.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const MyDoRun = () => {

  const [dorunInfo, setDorunInfo] = useState({
    title: '임시 제목',
    time: '임시 시간',
    perssonel: '임시 인원',
    level: '임시 난이도',
    distance: '임시 거리',
    desc: '임시 상세설명',
  })



  return (
    <>
      <div className="myDoRunForm">
        <div className="myDoRunInfo">
          <div className="myDoRunList">
            <div className='title'>
              참여중인 크루 이름
            </div>
          </div>
          <div className="myDoRunList">
            <div className="listCategory"> 출발지 </div>
            <div className="dapatture"> {dorunInfo.title} </div>
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
        <div className="goOutMyDorun">
          <div className="crewSigout">
            크루 나가기
          </div>
          <Link to="/chat">
            <div className="crewChat">Do Chat!!</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MyDoRun;
