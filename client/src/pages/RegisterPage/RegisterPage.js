import React, { useRef } from 'react'
import { useForm } from "react-hook-form";
import './RegisterPage.scss';

const RegisterPage = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef();
  password.current = watch("password");

  const onSubmit = (data) => {
    console.log('data', data)
  };

  return (
    <div className="registerBlock">
      <div className="registerWrapper">
        <h1 className="registerTitle">Sign Up</h1>
        <form
          className="registerFrm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>이메일</label>
          <input
            name="email"
            type="email"
            ref={register({
              required: true,
              pattern: /^\S+@\S+$/i
            })}
          />
          {errors.email && <p>This email field is required</p>}

          <label>사용자 이름</label>
          <input
            name="name"
            ref={register({
              required: true,
              maxLength: 10
            })}
          />
          {errors.name && errors.name.type === "required"
            && <p> This name field is required</p>}
          {errors.name && errors.name.type === "maxLength"
            && <p> Your input exceed maximum length</p>}

          <label>비밀번호</label>
          <input
            name="password"
            type="password"
            ref={register({
              required: true,
              minLength: 6
            })}
          />
          {errors.password && errors.password.type === "required"
            && <p> This name field is required</p>}
          {errors.password && errors.password.type === "minLength"
            && <p> Password must have at least 6 characters</p>}

          <label>비밀번호 확인</label>
          <input
            type="password"
            name="password_confirm"
            ref={register({
              required: true,
              validate: (value) =>
                value === password.current
            })}
          />
          {errors.password_confirm && errors.password_confirm.type === "required"
            && <p> This password confirm field is required</p>}
          {errors.password_confirm && errors.password_confirm.type === "validate"
            && <p>The passwords do not match</p>}

          <input type="submit"
            style={{ marginTop: '100px' }}
          />

        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
