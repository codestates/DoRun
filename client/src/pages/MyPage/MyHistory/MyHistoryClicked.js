import React from 'react';
import './MyHistoryClicked.scss';

const MyHistoryClicked = ({ filteredLog }) => {
  const renderHistory = () => {
    const historyList = [];
    if (filteredLog.length > 0) {
      filteredLog.map((el, index) => {
        historyList.push(
          <div className="MyHistory_content" key={index}>
            <div className="MyHistory_date">{el[0]}</div>
            <div className="MyHistory_DoRunTitle">{el[1]}</div>
          </div>
        );
      });
    } else {
      historyList.push(
        <div className="Preparing" key="Preparing">
          아직 DoRun 기록이 없습니다..
        </div>
      );
    }

    return historyList;
  };

  return (
    <>
      <div className="MyHistory">
        <div className="MyHistory_wrapper">
          <div className="MyHistory_top">
            <div className="MyHistory_title">나의 DoRun 모아보기</div>
          </div>

          <div className="MyHistory_mid">{renderHistory()}</div>
        </div>
      </div>
    </>
  );
};

export default MyHistoryClicked;
