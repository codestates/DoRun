import React from 'react';
import { Link } from 'react-router-dom';
import './WrongApproach.scss';

const WrongApproach = () => {
  return (
    <div className="WrongApproach">
      <img
        className="WrongApproach_img"
        src="/WrongApproach.png"
        alt="WrongApproach"
      />
      <h2 className="WrongApproach_title">페이지를 찾을 수 없습니다!!</h2>
      <span className="WrongApproach_text">
        방문하시려는 페이지의 주소가 잘못 입력되었거나,
      </span>
      <span className="WrongApproach_text">
        해당 페이지의 접근 권한이 없습니다.
      </span>
      <span className="WrongApproach_text">
        주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
      </span>
      <Link className="WrongApproach_toHome" to="/">
        홈으로 이동하기
      </Link>
    </div>
  );
};

export default WrongApproach;
