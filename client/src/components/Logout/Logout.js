import React from 'react';
import './Logout.scss';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../_actions/user_action';

function Logout() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);

  const handleLogout = () => {
    dispatch(logoutUser(userId))
      .then((res) => {
        document.location.href = '/';
      })
      .catch((e) => e);
  };

  return (
    <div className="logoutWrapper">
      <div className="logoutBtn" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
}

export default Logout;
