import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { OutsideClick } from '../../components/DropDown/OutsideClick';
import DropDown from '../../components/DropDown/DropDown';
import axios from 'axios';
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

  //* 유저 정보 로드
  const userId = useSelector((state) => state.user.userId);
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    image: '',
  });
  const [state, setState] = useState(true);
  useEffect(() => {
    if (state) {
      axios
        .get(`${process.env.REACT_APP_SERVER}/user/${userId}`)
        .then((res) => {
          setUserInfo({
            ...res.data.data,
          });
        });
    }
    return () => setState(false); // useEffect console err
  }, []);

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
        </div>

        <div className="MyPage_body">
          <div className="body_cards">
            <MyAccount />
            <MyDoRun />
          </div>
          <div className="body_cards">
            <MyHistory />
            <MyMedal />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyPage;
