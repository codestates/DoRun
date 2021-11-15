import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer/Footer';
import MyAccount from './MyAccount/MyAccount';
import MyDoRun from './MyDoRun/MyDoRun';
import MyHistory from './MyHistory/MyHistory';
import MyMedal from './MyMedal/MyMedal';
import { OutsideClick } from '../../components/DropDown/OutsideClick';
import DropDown from '../../components/DropDown/DropDown';
import axios from 'axios';
import './MyPage.scss';

const MyPage = () => {
  const userId = useSelector((state) => state.user.userId);
  const userCrewId = useSelector((state) => state.user.userCrewId);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = OutsideClick(dropdownRef, false);
  const dropDownHandler = () => setIsActive(!isActive);

  const [focused, setFocused] = useState({
    account: '',
    dorun: '',
    history: '',
    medal: '',
  });

  const [content, setContent] = useState({
    account: false,
    dorun: false,
    history: false,
    medal: false,
  });

  const [userInfo, setUserInfo] = useState({
    nickname: '',
    image: '',
  });

  //! 여기 밑으로 myDorun 카드
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
    axios.get(`${process.env.REACT_APP_SERVER}/user/${userId}`).then((res) => {
      setUserInfo({
        ...res.data.data,
        image: res.data.data.image,
      });
    });
    if (userCrewId) {
      axios
        .get(`${process.env.REACT_APP_SERVER}/crew/${userCrewId}`)
        .then((res) => {
          const {
            title,
            date,
            departure,
            time,
            personnel,
            level,
            distance,
            desc,
          } = res.data.data;
          const crewParticipant = res.data.CrewInUser;
          setDorunInfo({
            title,
            date,
            departure,
            time,
            personnel: `${crewParticipant.length}명 / ${personnel.slice(1)}`,
            level,
            distance,
            desc,
          });
        });
    }
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
          {/*┏-------------------------------------------- 윗줄 카드 --------------------------------------------┓*/}
          <div className="body_cards">
            {/*┏---------------------- My Account ----------------------┓*/}
            <div className={`body_card${focused.account}`}>
              <div
                className="card_wrapper"
                onClick={() => {
                  setFocused({
                    ...focused,
                    account: '_focused',
                  }),
                    setTimeout(() => {
                      setContent({
                        ...content,
                        account: true,
                      });
                    }, 500);
                }}
              >
                <div className="card_left">
                  <img
                    className="card_img"
                    src="/MyAccount.png"
                    alt="Card Img"
                  />
                </div>
                <div className="card_right">
                  <h2 className="card_title">My Account</h2>
                  <div className="card_content">
                    개인정보 수정 및 비밀번호 변경
                  </div>
                </div>
              </div>
              {content.account && (
                <>
                  <MyAccount />
                  <div
                    className="content_opened"
                    onClick={() => {
                      setFocused({
                        ...focused,
                        account: '',
                      }),
                        setContent({
                          ...content,
                          account: false,
                        });
                    }}
                  >
                    <img
                      className="content_close"
                      src="/close.png"
                      alt="close"
                    />
                  </div>
                </>
              )}
            </div>
            {/*┗---------------------- My Account ----------------------┛*/}

            {/*┏---------------------- My DoRun ----------------------┓*/}
            <div className={`body_card${focused.dorun}`}>
              <div
                className="card_wrapper"
                onClick={() => {
                  setFocused({
                    ...focused,
                    dorun: '_focused',
                  }),
                    setTimeout(() => {
                      setContent({
                        ...content,
                        dorun: true,
                      });
                    }, 500);
                }}
              >
                <div className="card_left">
                  <img className="card_img" src="/MyDoRun.png" alt="Card Img" />
                </div>
                <div className="card_right">
                  <h2 className="card_title">My DoRun</h2>
                  <div className="card_content">크루정보 확인 및 크루채팅</div>
                </div>
              </div>
              {content.dorun && (
                <>
                  <MyDoRun dorunInfo={dorunInfo} />
                  <div
                    className="content_opened"
                    onClick={() => {
                      setFocused({
                        ...focused,
                        dorun: '',
                      }),
                        setContent({
                          ...content,
                          dorun: false,
                        });
                    }}
                  >
                    <img
                      className="content_close"
                      src="/close.png"
                      alt="close"
                    />
                  </div>
                </>
              )}
            </div>
            {/*┗---------------------- My DoRun ----------------------┛*/}
          </div>
          {/*┗-------------------------------------------- 윗줄 카트 --------------------------------------------┛*/}

          {/*┏-------------------------------------------- 아랫줄 카드 --------------------------------------------┓*/}
          <div className="body_cards">
            {/*┏---------------------- My History ----------------------┓*/}
            <div className={`body_card${focused.history}`}>
              <div
                className="card_wrapper"
                onClick={() => {
                  setFocused({
                    ...focused,
                    history: '_focused',
                  }),
                    setTimeout(() => {
                      setContent({
                        ...content,
                        history: true,
                      });
                    }, 500);
                }}
              >
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
              {content.history && (
                <>
                  <MyHistory />
                  <div
                    className="content_opened"
                    onClick={() => {
                      setFocused({
                        ...focused,
                        history: '',
                      }),
                        setContent({
                          ...content,
                          history: false,
                        });
                    }}
                  >
                    <img
                      className="content_close"
                      src="/close.png"
                      alt="close"
                    />
                  </div>
                </>
              )}
            </div>
            {/*┗---------------------- My History ----------------------┛*/}

            {/*┏---------------------- My Medal ----------------------┓*/}
            <div className={`body_card${focused.medal}`}>
              <div
                className="card_wrapper"
                onClick={() => {
                  setFocused({
                    ...focused,
                    medal: '_focused',
                  }),
                    setTimeout(() => {
                      setContent({
                        ...content,
                        medal: true,
                      });
                    }, 500);
                }}
              >
                <div className="card_left">
                  <img className="card_img" src="/MyMedal.png" alt="Card Img" />
                </div>
                <div className="card_right">
                  <h2 className="card_title">My Medal</h2>
                  <div className="card_content">획득한 메달 확인</div>
                </div>
              </div>
              {content.medal && (
                <>
                  <MyMedal />
                  <div
                    className="content_opened"
                    onClick={() => {
                      setFocused({
                        ...focused,
                        medal: '',
                      }),
                        setContent({
                          ...content,
                          medal: false,
                        });
                    }}
                  >
                    <img
                      className="content_close"
                      src="/close.png"
                      alt="close"
                    />
                  </div>
                </>
              )}
            </div>
            {/*┗---------------------- My Medal ----------------------┛*/}
          </div>
          {/*┗-------------------------------------------- 아랫줄 카드 --------------------------------------------┛*/}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyPage;
