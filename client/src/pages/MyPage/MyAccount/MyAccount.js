import React from 'react';
import Footer from '../../../components/Footer/Footer';
import './MyAccount.scss';
const MyAccount = () => {
  return (
    <>
      <div className="MyAccount">
        <div className="MyAccount_wrapper">
          <div className="wrapper_top">My Account</div>
          <div className="wrapper_mid">
            <div className="mid_profileArea">
              <img
                className="mid_profile"
                src={'/defaultImg.png'}
                alt="Mid Img"
              />
            </div>

            <div className="mid_title">닉네임</div>
            <div className="mid_content">userInfo.nickname</div>
            <div className="mid_title">이메일</div>
            <div className="mid_content">userInfo.email</div>
          </div>
          <div className="wrapper_bot">
            <div className="mid_editBtnArea">
              <button className="mid_editBtn">수정</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyAccount;
