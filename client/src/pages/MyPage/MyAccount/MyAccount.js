import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ChangedModal from '../../../components/ChangedModal/ChangedModal';
import './MyAccount.scss';
const MyAccount_t = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    image: '',
    password: '',
    newPass1: '',
    newPass2: '',
  });

  // 이미지 미리보기
  const formData = new FormData();
  const changeImage = (e) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setUserInfo({
          ...userInfo,
          image: base64.toString(),
        });
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    formData.append('image', e.target.files[0]);
  };

  // 유효성 검사 및 서버 전송
  const editHandler = () => {
    const reg = /^.*(?=.{8,16})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
    if (reg.test(userInfo.newPass1) || userInfo.newPass1 === '') {
      if (userInfo.newPass1 === userInfo.newPass2) {
        // formData.append('password', userInfo.password);
        // formData.append('nickname', userInfo.nickname);
        // formData.append('newPassword', userInfo.newPass2);
        // axios
        //   .patch('http://localhost:3001/user', formData, {
        //     headers: {
        //       'content-type': 'multipart/form-data',
        //     },
        //   })
        //   .then((res) => {
        //     if (res.data.message) {
        //       setErrMsg('');
        //       ChangedModalHandler();
        //       console.log('수정 완료');
        //     }
        //   })
        //   .catch((error) => {
        //     setErrMsg('⚠ 현재 비밀번호를 정확히 입력해주세요!!');
        //   });
        setErrMsg('');
        ChangedModalHandler();
      } else {
        setErrMsg('⚠ 새로운 비밀번호가 서로 일치하지 않습니다!!');
      }
    } else {
      setErrMsg(
        '⚠ 비밀번호는 영문과 숫자를 혼용하여 8자 이상 16자 이하 입력해주세요!!'
      );
    }
  };

  // 수정 후 확인 모달
  const [errMsg, setErrMsg] = useState('');
  const [isChangedModalOpen, setIsChangedModalOpen] = useState(false);
  const ChangedModalHandler = () => {
    isChangedModalOpen
      ? setIsChangedModalOpen(false)
      : setIsChangedModalOpen(true);
  };

  // 유저 정보 로드
  useEffect(async () => {
    const userId = sessionStorage.getItem('userId');
    await axios.get(`http://localhost:3001/user/${userId}`).then((res) => {
      setUserInfo({
        ...res.data.data,
        image: res.data.data.image || '/defaultImg.png',
        password: '',
        newPass1: '',
        newPass2: '',
      });
    });
  }, []);

  return (
    <>
      <div className="MyAccount">
        <div className="MyAccount_wrapper">
          <div className="wrapper_mid">
            <div className="mid_profileArea">
              <label
                className="hoverArea"
                htmlFor="image"
                onChange={changeImage}
              >
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={changeImage}
                  style={{ display: 'none' }}
                />
                <img
                  className="mid_profile"
                  src={userInfo.image}
                  alt="Mid Img"
                />
                <div className="hoveredArea">
                  <img className="hoverIcon" src="/camera.png" alt="" />
                  <span>Edit Image</span>
                </div>
              </label>
            </div>

            <div className="mid_title">닉네임</div>
            <input
              className="mid_content"
              type="text"
              value={userInfo.nickname}
              onChange={(e) => {
                setUserInfo({ ...userInfo, nickname: e.target.value });
              }}
            />
            <div className="mid_title">현재 비밀번호</div>
            <input
              className="mid_content"
              type="text"
              value={userInfo.password}
              onChange={(e) => {
                setUserInfo({ ...userInfo, password: e.target.value });
              }}
            />
            <div className="mid_title">새로운 비밀번호</div>
            <input
              className="mid_content"
              type="password"
              onChange={(e) => {
                setUserInfo({ ...userInfo, newPass1: e.target.value });
              }}
            />
            <div className="mid_title">새로운 비밀번호 확인</div>
            <input
              className="mid_content"
              type="password"
              onChange={(e) => {
                setUserInfo({ ...userInfo, newPass2: e.target.value });
              }}
            />
          </div>
          <br />
          <div className="wrapper_bot">
            <div className="accountErrMsg">{errMsg && errMsg}</div>
            <button className="mid_editBtn" onClick={editHandler}>
              수정
            </button>
            {isChangedModalOpen && <ChangedModal />}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount_t;
