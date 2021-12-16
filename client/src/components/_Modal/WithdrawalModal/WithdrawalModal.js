import React from 'react';
import './WithdrawalModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { signoutUser } from '../../../_actions/user_action';
import { withdrawalCrew } from '../../../_actions/crew_action';

// const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
// const WithdrawalModalHandler = () => {
//   isWithdrawalModalOpen ? setIsWithdrawalModalOpen(false) : setIsWithdrawalModalOpen(true);
// };
// {isWithdrawalModalOpen && <WithdrawalModal WithdrawalModalHandler={WithdrawalModalHandler} />}

const WithdrawalModal = () => {
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const clicked = async () => {
    await dispatch(withdrawalCrew(userId));
    await dispatch(signoutUser(userId));
    document.location.href = '/';
  };
  return (
    <div className="withdrawalModal_container">
      <div className="withdrawalModal">
        <br />
        <div className="withdrawalModal_body">
          <h3 className="withdrawalModal_title">DoRun 회원탈퇴 완료</h3>
          <div>DoRun 서비스를 이용해주셔서 감사합니다.</div>
          <div>DoRun 홈으로 이동합니다.</div>
        </div>
        <br />
        <div className="withdrawalModal_footer">
          <div className="withdrawalModal_toHome" onClick={clicked}>
            확 인
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default WithdrawalModal;
