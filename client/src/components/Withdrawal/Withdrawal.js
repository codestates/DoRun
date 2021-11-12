import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Withdrawal.scss';
import WithdrawalModal from '../WithdrawalModal/WithdrawalModal';
import { signoutUser } from '../../_actions/user_action';

const Withdrawal = () => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);

  const checked = () => {
    setIsActive(!isActive);
  };


  const clicked = () => {
    dispatch(signoutUser(sessionStorage.getItem('userId')))
      .then((res) => {
        console.log('탈퇴에 대한 응답입니다.', res);
        WithdrawalModalHandler();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const WithdrawalModalHandler = () => {
    setIsWithdrawalModalOpen(!isWithdrawalModalOpen);
  };

  return (
    <>
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
        <div>
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
          onClick={clicked}
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
