import React from 'react';
import './MyMedalClicked.scss';

const MyMedalClicked = () => {
  return (
    <>
      {/* <div className="Preparing">서비스 준비 중...</div> */}
      <div className="MyMedal">
        <div className="MyMedal_wrapper">
          <div className="MyMedal_medalArea">
            <div className="medal_imgArea">
              <img className="medal_img" src="MyMedal/beginner.png" alt="Medal Img" />
            </div>
            <div className="medal_description">
              <div className="medal_title">Beginner</div>
              <div className="medal_info"> 총 1회, 5km 이상 완주 성공</div>
            </div>
            <div className="next_medal" />
          </div>
          <div className="MyMedal_medalArea">
            <div className="medal_imgArea">
              <img className="medal_img" src="MyMedal/intermediate.png" alt="Medal Img" />
            </div>
            <div className="medal_description">
              <div className="medal_title">Intermediate</div>
              <div className="medal_info"> 총 10회, 50km 이상 완주 성공</div>
            </div>
          </div>
          <div className="MyMedal_medalArea">
            <div className="medal_imgArea">
              <img className="medal_img" src="MyMedal/advenced.png" alt="Medal Img" />
            </div>
            <div className="medal_description">
              <div className="medal_title">Advanced</div>
              <div className="medal_info"> 총 20회, 150km 이상 완주 성공</div>
            </div>
          </div>
          <div className="MyMedal_medalArea">
            <div className="medal_imgArea">
              <img className="medal_img" src="MyMedal/professional.png" alt="Medal Img" />
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
