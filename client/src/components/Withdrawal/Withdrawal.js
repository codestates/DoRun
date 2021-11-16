import React, { useState } from 'react';
import './Withdrawal.scss';
import WithdrawalModal from '../WithdrawalModal/WithdrawalModal';

const Withdrawal = () => {
  const [isActive, setIsActive] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);

  const checked = () => {
    setIsActive(!isActive);
  };

  const WithdrawalModalHandler = () => {
    setIsWithdrawalModalOpen(!isWithdrawalModalOpen);
  };

  return (
    <>
      <div className="clicked_header">DoRun 회원탈퇴</div>
      <div className="clicked_body">
        <div>안내사항을 확인하고, Run Away 버튼을 눌러</div>
        <div>DoRun 서비스를 탈퇴할 수 있습니다.</div>
        <br />
        <div className="withdrawal_notice">
          <div className="notice_title">서비스 탈퇴 안내 사항</div>
          <p className="notice_content">
            DoRun에 저장된 모든 회원정보가 삭제됩니다.
          </p>
          <p className="notice_content">
            삭제된 정보는 다시 복구할 수 없습니다.
          </p>
          <p className="notice_content">
            현재 소속된 크루에서 자동으로 탈퇴됩니다.
          </p>
        </div>
        <br />
      </div>
      <div className="clicked_footer">
        <div className="footer_input">
          <input
            type="checkbox"
            onClick={checked}
            style={{ cursor: 'pointer' }}
          />
          <span>&nbsp;안내사항을 모두 확인하였으며, 이에 동의합니다.</span>
        </div>
        <br />
        <button
          className={`withdrawal_btn ${isActive ? `active` : 'inactive'}`}
          onClick={WithdrawalModalHandler}
          disabled={isActive ? '' : 'disabled'}
        >
          Run Away...
        </button>
        {isWithdrawalModalOpen && <WithdrawalModal />}
      </div>
    </>
  );
};

export default Withdrawal;
