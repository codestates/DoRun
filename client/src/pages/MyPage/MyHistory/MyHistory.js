import React from 'react';
import './MyHistory.scss';

const MyHistory = () => {
  const crews = [
    { crewId: '1', title: '두런', createdAt: '11.01' },
    { crewId: '2', title: '두런두런', createdAt: '11.02' },
  ];

  return (
    <>
      <div className="Preparing">서비스 준비 중...</div>
      {/* <div className="MyHistory">
        <div className="MyHistory_wrapper">
          <div className="MyHistory_top">
            <div className="MyHistory_title">나의 DoRun 모아보기</div>
          </div>

          <div className="MyHistory_mid">
            <div className="MyHistory_content">
              <span className="MyHistory_date">{crews[0].createdAt}</span>
              <span className="MyHistory_DoRunTitle">{crews[0].title}</span>
            </div>
            <div className="MyHistory_content">
              <span className="MyHistory_date">{crews[1].createdAt}</span>
              <span className="MyHistory_DoRunTitle">{crews[1].title}</span>
            </div>
            <div className="MyHistory_content">
              <span className="MyHistory_date">createdAt</span>
              <span className="MyHistory_DoRunTitle">title</span>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default MyHistory;
