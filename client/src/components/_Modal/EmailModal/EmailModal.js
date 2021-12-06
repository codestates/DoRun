import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../_actions/user_action';
import './EmailModal.scss';

// const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
// const emailModalHandler = () => {
//   isEmailModalOpen ? setIsEmailModalOpen(false) : setIsEmailModalOpen(true);
// };
// { isEmailModalOpen && <EmailModal emailModalHandler={emailModalHandler} /> }

const EmailModal = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);

  return (
    <div className="emailModalContainer">
      <div className="emailModal">
        <div className="emailModal_body">
          <div className="emailModal_text">
            인증 메일 전송이 완료되었습니다.
          </div>
          <div className="emailModal_text">
            인증 후 다시 로그인해 주시기 바랍니다.
          </div>
          <Link
            className="emailModal_btn"
            onClick={() => {
              dispatch(logoutUser(userId));
            }}
            to="/"
          >
            이동하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
