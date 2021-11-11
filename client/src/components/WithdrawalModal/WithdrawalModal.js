import React from 'react';
import './WithdrawalModal.scss';

// const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
// const WithdrawalModalHandler = () => {
//   isWithdrawalModalOpen ? setIsWithdrawalModalOpen(false) : setIsWithdrawalModalOpen(true);
// };
// {isWithdrawalModalOpen && <WithdrawalModal WithdrawalModalHandler={WithdrawalModalHandler} />}

const WithdrawalModal = () => {
  return (
    <div className="WithdrawalModalmodalContainer">
      <div className="WithdrawalModalmodal">
        <br />
        <div className="modalBody">
          <h3 className="WithdrawalModalmodal_title">DoRun 회원탈퇴 완료</h3>
          <div>DoRun 서비스를 이용해주셔서 감사합니다.</div>
          <div>DoRun 홈으로 이동합니다.</div>
        </div>
        <br />
        <div className="modalFooter">
          <div
            className="toHome"
            onClick={() => {
              document.location.href = '/';
            }}
          >
            확 인
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default WithdrawalModal;
