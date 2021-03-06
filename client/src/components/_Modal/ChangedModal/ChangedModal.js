import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../_actions/user_action';
import './ChangedModal.scss';

// const [isChangedModalOpen, setIsChangedModalOpen] = useState(false);
// const ChangedModalHandler = () => {
//   isChangedModalOpen ? setIsChangedModalOpen(false) : setIsChangedModalOpen(true);
// };
// {isChangedModalOpen && <ChangedModal ChangedModalHandler={ChangedModalHandler} />}

const ChangedModal = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);

  const handleLogout = () => {
    dispatch(logoutUser(userId));
    setTimeout(() => {
      document.location.href = '/';
    }, 500);
  };
  return (
    <div className="changedModal_container">
      <div className="changedModal">
        <br />
        <div className="changedModal_body">
          <div>개인정보 수정이 완료되었습니다</div>
          <div>다시 로그인 해주세요!!</div>
        </div>
        <br />
        <div className="changedModal_footer">
          <div className="changedModal_toHome" onClick={handleLogout}>
            확 인
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default ChangedModal;
