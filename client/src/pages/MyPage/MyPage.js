import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../../components/Logout/Logout';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import './MyPage.scss';

const MyPage = () => {
  const userId = sessionStorage.getItem('userId');
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    profileImg: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/user/${userId}`).then((res) => {
      setUserInfo({
        ...res.data.data,
        profileImg: res.data.profileImg || '/defaultImg.png',
      });
    });
  }, []);

  return (
    <>
      <div className="MyPage">
        <div className="MyPage_header">
          <img
            className="header_profile"
            src={userInfo.profileImg}
            alt="Profile Img"
          />
          <br />
          <div className="header_content">{userInfo.nickname}의 마이페이지</div>
        </div>

        <div className="MyPage_body">
          <div className="body_cards">
            <Link to="/mypage/account">
              <div className="body_card">
                <div className="card_left">
                  <img
                    className="card_img"
                    src="/MyAccount.png"
                    alt="Card Img"
                    style={{ padding: '10px 0px' }}
                  />
                </div>
                <div className="card_right">
                  <h2 className="card_title">My Account</h2>
                  <div className="card_content">개인정보 수정 및 회원탈퇴</div>
                </div>
              </div>
            </Link>

            <Link to="/mypage/dorun">
              <div className="body_card">
                <div className="card_left">
                  <img className="card_img" src="/MyDoRun.png" alt="Card Img" />
                </div>
                <div className="card_right">
                  <h2 className="card_title">My DoRun</h2>
                  <div className="card_content">크루정보 확인 및 채팅</div>
                </div>
              </div>
            </Link>
          </div>

          <div className="body_cards">
            <Link to="/mypage/history">
              <div className="body_card">
                <div className="card_left">
                  <img
                    className="card_img"
                    src="/MyHistory.png"
                    alt="Card Img"
                  />
                </div>
                <div className="card_right">
                  <h2 className="card_title">My History</h2>
                  <div className="card_content">DoRun 기록 확인</div>
                </div>
              </div>
            </Link>

            <Link to="/mypage/medal">
              <div className="body_card">
                <div className="card_left">
                  <img className="card_img" src="/MyMedal.png" alt="Card Img" />
                </div>
                <div className="card_right">
                  <h2 className="card_title">My Medal</h2>
                  <div className="card_content">획득한 메달 확인</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <button>회원탈퇴</button>
      </div>
      {/* <Logout /> */}
      <Footer />
    </>
  );
};

export default MyPage;
