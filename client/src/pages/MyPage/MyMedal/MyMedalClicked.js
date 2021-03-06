import React, { useState, useEffect } from 'react';
import './MyMedalClicked.scss';

const MyMedalClicked = ({ userMedalLog }) => {

  let [medalLevel, setMedalLevel] = useState(0);

  let runningDistance = userMedalLog.reduce((acc, cur) => {
    // console.log(cur[2])
    if (cur[2] === '~5km') {
      return acc += 5;
    }
    else if (cur[2] === '~10km') {
      return acc += 10;
    }
    else {
      return acc += 15;
    }
  }, 0)


  console.log(userMedalLog);
  console.log('횟수', userMedalLog.length);
  console.log('거리', runningDistance)


  useEffect(() => {

    if (userMedalLog.length < 1 || runningDistance < 5) {
      setMedalLevel(0);
    }
    else if (userMedalLog.length < 10 && 5 <= runningDistance) {
      setMedalLevel(1);
    }
    else if (userMedalLog.length < 20 && 50 <= runningDistance) {
      setMedalLevel(2);
    }
    else if ((userMedalLog.length < 30 && 150 <= runningDistance)
      || (30 <= userMedalLog.length && runningDistance < 250)) {
      setMedalLevel(3);
    }
    else if (30 <= userMedalLog.length && 250 <= runningDistance) {
      setMedalLevel(4);
    }

  }, [])

  // console.log('현재 메달 레벨', medalLevel)








  return (
    <>
      <div className="MyMedal">
        <div className="MyMedal_wrapper">
          <div className="MyMedal_medalArea">
            <div className="medal_imgArea">
              <img className={1 <= medalLevel ? "medal_img success" : "medal_img"} src="MyMedal/beginner.png" alt="Medal Img" />
              <div className={1 <= medalLevel ? "next_medal success first" : "next_medal"}> </div>
            </div>
            <div className="medal_description">
              <div className="medal_title">Beginner</div>
              <div className="medal_info"> 총 1회, 5km 이상 완주 성공</div>
            </div>
          </div>
          <div className="MyMedal_medalArea">
            <div className="medal_imgArea">
              <img className={2 <= medalLevel ? "medal_img success" : "medal_img"} src="MyMedal/intermediate.png" alt="Medal Img" />
              <div className={2 <= medalLevel ? "next_medal success second" : "next_medal"}> </div>
            </div>
            <div className="medal_description">
              <div className="medal_title">Intermediate</div>
              <div className="medal_info"> 총 10회, 50km 이상 완주 성공</div>
            </div>
          </div>
          <div className="MyMedal_medalArea">
            <div className="medal_imgArea">
              <img className={3 <= medalLevel ? "medal_img success" : "medal_img"} src="MyMedal/advenced.png" alt="Medal Img" />
              <div className={3 <= medalLevel ? "next_medal success" : "next_medal"}> </div>
            </div>
            <div className="medal_description">
              <div className="medal_title">Advanced</div>
              <div className="medal_info"> 총 20회, 150km 이상 완주 성공</div>
            </div>
          </div>
          <div className="MyMedal_medalArea">
            <div className="medal_imgArea">
              <img className={4 <= medalLevel ? "medal_img success" : "medal_img"} src="MyMedal/professional.png" alt="Medal Img" />
            </div>
            <div className="medal_description">
              <div className="medal_title">Professional</div>
              <div className="medal_info"> 총 30회, 250km 이상 완주 성공</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyMedalClicked;
