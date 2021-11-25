import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { OutsideClick } from '../../components/DropDown/OutsideClick';
import DropDown from '../../components/DropDown/DropDown';
import EmailVerification from '../../components/EmailVerification/EmailVerification';
import MyAccount from './MyAccount/MyAccount';
import MyDoRun from './MyDoRun/MyDoRun';
import MyHistory from './MyHistory/MyHistory';
import MyMedal from './MyMedal/MyMedal';
import Footer from '../../components/Footer/Footer';
import './MyPage.scss';

const MyPage = () => {
  //* 드롭 다운
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = OutsideClick(dropdownRef, false);
  const dropDownHandler = () => setIsActive(!isActive);

  //* 유저 정보
  const userInfo = useSelector((state) => state.user);
  console.log(userInfo);

  return (
    <>
      <div className="MyPage">
        <div className="MyPage_header">
          <img
            className="header_profile"
            src={userInfo.image || '/defaultImg.png'}
            alt="Profile Img"
          />
          <img
            className="header_etc"
            src="/etc.png"
            alt="etc"
            onClick={dropDownHandler}
          />
          <DropDown
            userInfo={userInfo}
            isActive={isActive}
            dropdownRef={dropdownRef}
          />
          <br />
          <div className="header_content">{userInfo.nickname}의 마이페이지</div>
          <EmailVerification />
        </div>

        <div className="MyPage_body">
          {userInfo.isauth ? (
            <>
              <div className="body_cards">
                <MyAccount />
                <MyDoRun />
              </div>
              <div className="body_cards">
                <MyHistory />
                <MyMedal />
              </div>
            </>
          ) : (
            <div className="nonVerified">
              <div className="nonVerified_text">
                이메일 인증이 되지 않은 회원입니다.
              </div>
              <div className="nonVerified_text">
                상단의 이메일 인증 재발송을 통해,
              </div>
              <div className="nonVerified_text">
                이메일 인증을 진행해 주세요!!
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyPage;
