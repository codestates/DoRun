import React from 'react';
import './Logout.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../_actions/user_action';

function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = sessionStorage.getItem('userId');

  const handleLogout = () => {
    console.log(userId);
    dispatch(logoutUser(userId))
      .then((res) => {
        console.log(res);
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
