import React from "react";
import { Link } from "react-router-dom";
import "./Modal.scss";

// const [isOpen, setIsOpen] = useState(false);
// const modalHandler = () => {
//   isOpen ? setIsOpen(false) : setIsOpen(true);
// };
// {isOpen && <Modal modalHandler={modalHandler} />}

const Modal = ({ modalHandler }) => {
  return (
    <div className="modalContainer">
      <div className="modal">
        <div className="modalHeader">
          <div className="modalExit" onClick={modalHandler}>
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
          <div className="toExit" onClick={modalHandler}>
            나가기
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Modal;
