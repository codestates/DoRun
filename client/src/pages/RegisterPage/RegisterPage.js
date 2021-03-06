import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import './RegisterPage.scss';

import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../_actions/user_action';
import Footer from '../../components/Footer/Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const RegisterPage = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, getValues, watch, errors } = useForm();

  const password = useRef();
  password.current = watch('password');

  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false,
  });
  const [passwordConfirmType, setPasswordConfirmType] = useState({
    type: 'password',
    visible: false,
  });

  const handlePasswordType = (e) => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: 'text', visible: true };
      }
      return { type: 'password', visible: false };
    });
  };

  const handlePasswordConfirmType = (e) => {
    setPasswordConfirmType(() => {
      if (!passwordConfirmType.visible) {
        return { type: 'text', visible: true };
      }
      return { type: 'password', visible: false };
    });
  };

  const onSubmit = async (data) => {
    const { email, nickname, password } = getValues();
    console.log(data);
    let body = {
      email,
      nickname,
      password,
    };

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.message === 'success') {
        props.history.push('/welcome');
      } else {
        alert('Failed to sign up');
      }
    });
  };

  return (
    <>
      <div className="registerBlock">
        <div className="registerWrapper">
          <h1 className="registerTitle">Sign Up</h1>
          <form className="registerFrm" onSubmit={handleSubmit(onSubmit)}>
            <label className="labelTitle">?????????</label>
            <input
              name="email"
              type="email"
              ref={register({
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              autoFocus
            />
            {errors.email && errors.email.type === 'required' && (
              <p>???????????? ??????????????????.</p>
            )}
            {errors.email && errors.email.type === 'pattern' && (
              <p>????????? ????????? ?????? ???????????????.</p>
            )}

            <label className="labelTitle">????????? ??????</label>
            <input
              name="nickname"
              ref={register({
                required: true,
                maxLength: 6,
              })}
            />
            {errors.nickname && errors.nickname.type === 'required' && (
              <p> ????????? ??????????????????.</p>
            )}
            {errors.nickname && errors.nickname.type === 'maxLength' && (
              <p> ????????? ?????? 6???????????? ?????? ???????????????.</p>
            )}
            <div className="passwordField">
              <label className="labelTitle">????????????</label>
              <input
                name="password"
                type={passwordType.type}
                ref={register({
                  required: true,
                  pattern: /^.*(?=.{8,16})(?=.*[0-9])(?=.*[a-zA-Z]).*$/,
                })}
                style={{
                  fontFamily: 'GmarketSans',
                }}
              />
              <span onClick={handlePasswordType}>
                {passwordType.visible ? (
                  <FontAwesomeIcon id="toggler" icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon id="toggler" icon={faEye} />
                )}
              </span>
            </div>
            {errors.password && errors.password.type === 'required' && (
              <p> ??????????????? ??????????????????.</p>
            )}
            {errors.password && errors.password.type === 'pattern' && (
              <p> ????????? ????????? ???????????? 8??? ?????? 16??? ?????? ??????????????????</p>
            )}
            <div className="passwordField">
              <label className="labelTitle">???????????? ??????</label>
              <input
                type={passwordConfirmType.type}
                name="password_confirm"
                ref={register({
                  required: true,
                  validate: (value) => value === password.current,
                })}
                style={{
                  fontFamily: 'GmarketSans',
                }}
              />
              <span onClick={handlePasswordConfirmType}>
                {passwordConfirmType.visible ? (
                  <FontAwesomeIcon id="toggler" icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon id="toggler" icon={faEye} />
                )}
              </span>
            </div>
            {errors.password_confirm &&
              errors.password_confirm.type === 'required' && (
                <p> ???????????? ????????? ?????? ??????????????????.</p>
              )}
            {errors.password_confirm &&
              errors.password_confirm.type === 'validate' && (
                <p> Do not match. ??????????????? ??????????????????.</p>
              )}
            {/* ???????????? */}
            {/* <label className="labelTitle">
              <input type="checkbox" ref={register} />
              <span>[??????] ????????? ????????? ?????? ???????????? ????????? ???????????????.</span>
            </label> */}
            <input
              name="checkbox"
              type="checkbox"
              id="someID"
              ref={register({ required: true })}
            />
            <label htmlFor="someID" className="labelTitle checkbox-1">
              [??????] ????????? ????????? ?????? ???????????? ?????? ??? ????????? ???????????????.
            </label>
            {errors.checkbox && errors.checkbox.type === 'required' && (
              <p>?????? ????????? ??????????????????!</p>
            )}
            <input
              type="submit"
              value="DoRun!"
              style={{ marginTop: '100px' }}
            />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withRouter(RegisterPage);
