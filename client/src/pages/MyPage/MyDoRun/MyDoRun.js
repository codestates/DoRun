import './MyDoRun.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CrewSignout from '../../../components/CrewSignout/CrewSignout';
import CrewSignoutBack from '../../../components/CrewSignout/CrewSignoutBack';

const MyDoRun = ({ dorunInfo }) => {
  const [crewSignoutOpen, setCrewSignoutOpen] = useState(false);
  const userCrewId = Number(sessionStorage.getItem('userCrewId'));

  const crewSignoutModalHandler = () => {
    if (crewSignoutOpen === true) {
      setCrewSignoutOpen(false);
    }
    if (crewSignoutOpen === false) {
      setCrewSignoutOpen(true);
    }
  };

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
              <div className="listCategory">세부사항</div>
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

export default MyDoRun;
