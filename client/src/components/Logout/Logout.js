import React from 'react';
import './Logout.scss';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../_actions/user_action';

function Logout() {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user)
    const userId = sessionStorage.getItem('id')

    const handleLogout = () => {
        dispatch(logoutUser(userId))
            .then((res) => history.push('/'))
            .catch(e => e)


    }

    return (
        <>
            <div className="logoutBtn" onClick={handleLogout}> Logout </div>
        </>
    )
}

export default Logout;
