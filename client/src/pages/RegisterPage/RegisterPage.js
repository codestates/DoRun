import React, { useRef } from 'react'
import { useForm } from 'react-hook-form';
import './RegisterPage.scss';

import { useDispatch } from 'react-redux';
import { registerUser } from '../../_actions/user_action';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, getValues, watch, errors } = useForm();

  console.log(watch('email'));


  const password = useRef();
  password.current = watch('password');

  const onSubmit = async (data) => {
    console.log('data', data);

    const { email, name, password } = getValues();
    let body = {
      email,
      name,
      password,
    };

    dispatch(registerUser(body))
      .then(res => {
        if (res.payload.success) {
          props.history.push('/login');
        } else {
          alert('Failed to sign up');
        }
      })
  };

  return (
    <div className='registerBlock'>
      <div className='registerWrapper'>
        <h1 className='registerTitle'>Sign Up</h1>
        <form
          className='registerFrm'
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>이메일</label>
          <input
            name='email'
            type='email'
            ref={register({
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            })}
          />
          {errors.email && errors.email.type === 'required'
            && <p>이메일을 입력해주세요.</p>}
          {errors.email && errors.email.type === 'pattern'
            && <p>이메일 형식이 잘못 되었습니다.</p>}


          <label>사용자 이름</label>
          <input
            name='name'
            ref={register({
              required: true,
              maxLength: 6
            })}
          />
          {errors.name && errors.name.type === 'required'
            && <p> 이름을 입력해주세요.</p>}
          {errors.name && errors.name.type === 'maxLength'
            && <p> 이름은 최대 6글자까지 입력 가능합니다.</p>}

          <label>비밀번호</label>
          <input
            name='password'
            type='password'
            ref={register({
              required: true,
              pattern: /^.*(?=.{8,16})(?=.*[0-9])(?=.*[a-zA-Z]).*$/
            })}
          />
          {errors.password && errors.password.type === 'required'
            && <p> 비밀번호를 입력해주세요.</p>}
          {errors.password && errors.password.type === 'pattern'
            && <p> 영문과 숫자를 혼용하여 8자 이상 16자 이하 입력해주세요</p>}

          <label>비밀번호 확인</label>
          <input
            type='password'
            name='password_confirm'
            ref={register({
              required: true,
              validate: (value) =>
                value === password.current
            })}
          />
          {errors.password_confirm && errors.password_confirm.type === 'required'
            && <p> 비밀번호 확인을 위해 입력해주세요.</p>}
          {errors.password_confirm && errors.password_confirm.type === 'validate'
            && <p> Do not match. 비밀번호를 확인해주세요.</p>}

          <input
            type='submit'
            style={{ marginTop: '100px' }}
          />

        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
