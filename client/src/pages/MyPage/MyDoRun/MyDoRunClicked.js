import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CrewSignout from '../../../components/_Modal/CrewSignout/CrewSignout';
import CrewSignoutBack from '../../../components/_Modal/CrewSignout/CrewSignoutBack';
import './MyDoRunClicked.scss';

const MyDoRunClicked = () => {
  //* 크루 탈퇴 모달
  const [crewSignoutOpen, setCrewSignoutOpen] = useState(false);
  const crewSignoutModalHandler = () => {
    crewSignoutOpen ? setCrewSignoutOpen(false) : setCrewSignoutOpen(true);
  };

  //* 가입된 크루 정보 로드
  const userCrewId = useSelector((state) => state.user.userCrewId);
  const [dorunInfo, setDorunInfo] = useState({
    title: '',
    date: '',
    departure: '',
    time: '',
    personnel: '',
    level: '',
    distance: '',
    desc: '',
  });
  useEffect(() => {
    if (userCrewId) {
      axios
        .get(`${process.env.REACT_APP_SERVER}/crew/${userCrewId}`)
        .then((res) => {
          setDorunInfo({
            ...res.data.data,
            personnel: `${res.data.CrewInUser.length
              }명 / ${res.data.data.personnel.slice(1)}`,
          });
        });
    }
  }, []);

  return (
    <>
      {userCrewId ? (
        <div className="myDoRunForm">
          <div className="myDoRunInfo">
            <div className="myDoRunList">
              <div className="title">{dorunInfo.title}</div>
            </div>
            <div className="myDoRunList">
              <div className="listCategory">출발지</div>
              <div className="departure"> {dorunInfo.departure} </div>
            </div>
            <div className="myDoRunList">
              <div className="listCategory">날짜</div>
              <div className="date"> {dorunInfo.date} </div>
            </div>
            <div className="myDoRunList">
              <div className="listCategory">시간</div>
              <div className="time"> {dorunInfo.time} </div>
            </div>
            <div className="myDoRunList">
              <div className="listCategory">인원</div>
              <div className="personnel"> {dorunInfo.personnel} </div>
            </div>
            <div className="myDoRunList">
              <div className="listCategory">난이도</div>
              <div className="level">
                {dorunInfo.level === '쉬움' ? (
                  <>
                    <div className="crewLevel picked">쉬움</div>
                    <div className="crewLevel">보통</div>
                    <div className="crewLevel">어려움</div>
                  </>
                ) : dorunInfo.level === '보통' ? (
                  <>
                    <div className="crewLevel">쉬움</div>
                    <div className="crewLevel picked">보통</div>
                    <div className="crewLevel">어려움</div>
                  </>
                ) : dorunInfo.level === '어려움' ? (
                  <>
                    <div className="crewLevel">쉬움</div>
                    <div className="crewLevel">보통</div>
                    <div className="crewLevel picked">어려움</div>
                  </>
                ) : (
                  dorunInfo.level
                )}
              </div>
            </div>
            <div className="myDoRunList">
              <div className="listCategory">거리</div>
              <div className="distance">
                {dorunInfo.distance === '~5km' ? (
                  <>
                    <div className="crewLevel picked">~5km</div>
                    <div className="crewLevel">~10km</div>
                    <div className="crewLevel">15km~</div>
                  </>
                ) : dorunInfo.distance === '~10km' ? (
                  <>
                    <div className="crewLevel">~5km</div>
                    <div className="crewLevel picked">~10km</div>
                    <div className="crewLevel">15km~</div>
                  </>
                ) : dorunInfo.distance === '15km~' ? (
                  <>
                    <div className="crewLevel">~5km</div>
                    <div className="crewLevel">~10km</div>
                    <div className="crewLevel picked">15km~</div>
                  </>
                ) : (
                  dorunInfo.distance
                )}
              </div>
            </div>
            <div className="myDoRunList">
              <div className="listCategory desc">세부사항</div>
              <div className="Desc"> {dorunInfo.desc} </div>
            </div>
          </div>
          <div className="goOutMyDorun">
            <div className="crewSigout" onClick={crewSignoutModalHandler}>
              <CrewSignout
                crewSignoutOpen={crewSignoutOpen}
                setCrewSignoutOpen={setCrewSignoutOpen}
              />
              <CrewSignoutBack crewSignoutOpen={crewSignoutOpen} />
            </div>
            <Link to="/chat">
              <div className="crewChat">Do Chat !!</div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="MyDoRun_unjoined">
          <div className="unjoined_content">가입한 크루가 없습니다.</div>
          <Link to="/map" className="unjoined_link">
            크루 가입하러 가기 {'>>'}
          </Link>
        </div>
      )}
    </>
  );
};

export default MyDoRunClicked;
