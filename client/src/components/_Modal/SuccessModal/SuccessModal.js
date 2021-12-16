import React from 'react';
import { Link } from 'react-router-dom';
import './SuccessModal.scss';

// const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
// const SuccessModalHandler = () => {
//   isSuccessModalOpen ? setIsSuccessModalOpen(false) : setIsSuccessModalOpen(true);
// };
// {isSuccessModalOpen && <SuccessModal SuccessModalHandler={SuccessModalHandler} />}

const SuccessModal = ({ SuccessModalHandler }) => {
  return (
    <div className="successModal_container">
      <div className="successModal">
        <div className="successModal_header">
          <div className="successModal_exit" onClick={SuccessModalHandler}>
            x
          </div>
        </div>
        <br />
        <div className="successModal_body">
          <div>크루 생성이 완료되었습니다!</div>
        </div>
        <br />
        <div className="successModal_footer">
          <Link to="/mypage">
            <div className="successModal_toLogin">확인하기</div>
          </Link>
          <div
            className="successModal_toExit"
            onClick={() => {
              location.reload();
            }}
          >
            다른 크루 둘러보기
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default SuccessModal;
