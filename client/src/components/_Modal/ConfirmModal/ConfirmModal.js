import React from 'react';
import { Link } from 'react-router-dom';
import './ConfirmModal.scss';

// const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
// const confirmModalHandler = () => {
//   isConfirmModalOpen ? setIsConfirmModalOpen(false) : setIsConfirmModalOpen(true);
// };
// { isConfirmModalOpen && <ConfirmModal confirmModalHandler={confirmModalHandler} /> }

const ConfirmModal = ({ confirmModalHandler, userId }) => {
  return (
    <div className="modalContainer">
      {userId ? (
        <div className="modal">
          <div className="modalHeader">
            <div className="modalExit" onClick={confirmModalHandler}>
              x
            </div>
          </div>
          <div className="modalBody">
            <div>크루 가입이 완료되었습니다!!</div>
          </div>
          <br />
          <div className="modalFooter">
            <div
              className="toLogin"
              onClick={() => {
                location.reload();
              }}
            >
              다른 크루 둘러보기
            </div>
            <Link to="/chat">
              <div className="toDoChat">Do Chat!!</div>
            </Link>
          </div>
          <br />
        </div>
      ) : (
        <div className="modal">
          <div className="modalHeader">
            <div className="modalExit" onClick={confirmModalHandler}>
              x
            </div>
          </div>
          <br />
          <div className="modalBody">
            <div>로그인이 필요한 서비스입니다.</div>
            <div>로그인 페이지로 이동하시겠습니까?</div>
          </div>
          <br />
          <div className="modalFooter">
            <Link to="/login">
              <div className="toLogin">이동하기</div>
            </Link>
            <div className="toExit" onClick={confirmModalHandler}>
              나가기
            </div>
          </div>
          <br />
        </div>
      )}
    </div>
  );
};

export default ConfirmModal;
