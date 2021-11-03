import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signoutUser } from '../../_actions/user_action';
import './Signout.scss';

function Signout() {

  const dispatch = useDispatch();
  const history = useHistory();

  const signoutHandler = () => {
    dispatch(signoutUser(sessionStorage.getItem('userId')))
      .then((res) => {
        console.log('탈퇴에 대한 응답입니다.', res)
        history.push('/')
      })
      .catch((e) => console.log(e))

  }

  return (
    <div className='signout' onClick={signoutHandler}>
      {' '}Signout{' '}
    </div>
  )
}

export default Signout
