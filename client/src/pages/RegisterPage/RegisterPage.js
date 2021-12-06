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
            <label className="labelTitle">이메일</label>
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
              <p>이메일을 입력해주세요.</p>
            )}
            {errors.email && errors.email.type === 'pattern' && (
              <p>이메일 형식이 잘못 되었습니다.</p>
            )}

            <label className="labelTitle">사용자 이름</label>
            <input
              name="nickname"
              ref={register({
                required: true,
                maxLength: 6,
              })}
            />
            {errors.nickname && errors.nickname.type === 'required' && (
              <p> 이름을 입력해주세요.</p>
            )}
            {errors.nickname && errors.nickname.type === 'maxLength' && (
              <p> 이름은 최대 6글자까지 입력 가능합니다.</p>
            )}
            <div className="passwordField">
              <label className="labelTitle">비밀번호</label>
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
              <p> 비밀번호를 입력해주세요.</p>
            )}
            {errors.password && errors.password.type === 'pattern' && (
              <p> 영문과 숫자를 혼용하여 8자 이상 16자 이하 입력해주세요</p>
            )}
            <div className="passwordField">
              <label className="labelTitle">비밀번호 확인</label>
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
                <p> 비밀번호 확인을 위해 입력해주세요.</p>
              )}
            {errors.password_confirm &&
              errors.password_confirm.type === 'validate' && (
                <p> Do not match. 비밀번호를 확인해주세요.</p>
              )}
            {/* 체크박스 */}
            {/* <label className="labelTitle">
              <input type="checkbox" ref={register} />
              <span>[필수] 이메일 인증을 위한 개인정보 수집에 동의합니다.</span>
            </label> */}
            <input
              name="checkbox"
              type="checkbox"
              id="someID"
              ref={register({ required: true })}
            />
            <label htmlFor="someID" className="labelTitle checkbox-1">
              [필수] 이메일 인증을 위한 개인정보 수집 및 이용에 동의합니다.
            </label>
            {errors.checkbox && errors.checkbox.type === 'required' && (
              <p>필수 조건에 체크해주세요!</p>
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
