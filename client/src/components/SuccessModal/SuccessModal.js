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
    <div className="modalContainer">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalExit" onClick={SuccessModalHandler}>
            x
          </div>
        </div>
        <br />
        <div className="modalBody">
          <div>크루 생성이 완료되었습니다!</div>
        </div>
        <br />
        <div className="modalFooter">
          <Link to="/mypage">
            <div className="toLogin">확인하기</div>
          </Link>
          <div
            className="toExit"
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
