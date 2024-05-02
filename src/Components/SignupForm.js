import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as STR from '../../src/service/string';
import * as ST from '../../src/service/storage';

const SignupForm = () => {

  const navigate = useNavigate();
  const {
    getValues,
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm();

  const fnSubmit = (data) => {
    axios
    .post(
      STR.urlAddMembers,
      {
        email: getValues("_useremail"),
        nickname: getValues("_usernickname"),
        passwd: getValues("_passwd"),
        name: getValues("_name"),
        gender: getValues("_gender"),
        birthDate: getValues("_birthDate"),
      }
    )
    .then((res) => {
      console.log("회원가입 완료");
      alert("로그인을 해주세요.")
    })
    .catch((error) => console.log("reducer login error", error));

  };

  return (
    <form onSubmit={handleSubmit(fnSubmit)}>
      <h1>Exchange Diary</h1>
      <h2>회원가입</h2>
      <div>
        <input
            style={{"margin":"4px 0"}}
            type="email"
            name="_useremail"
            id="signupUserEmail"
            placeholder="이메일을 입력해주세요."
            {...register("_useremail", {
              //required: "입력되지 않았습니다.",
            })}
          />
      </div>
      <ErrorMessage
        errors={errors}
        name="_useremail"
        render={({ message }) => (
          <span className="errorMessageWrap">{message}</span>
        )}
      />
      <div>
        <input
            style={{"margin":"4px 0"}}
            type="nickname"
            name="_usernickname"
            id="signupUsernickname"
            placeholder="닉네임을 입력해주세요."
            {...register("_usernickname", {
              //required: "입력되지 않았습니다.",
            })}
          />
      </div>
      <ErrorMessage
        errors={errors}
        name="_usernickname"
        render={({ message }) => (
          <span className="errorMessageWrap">{message}</span>
        )}
      />
      <div>
        <input
          style={{"margin":"4px 0"}}
          type="password"
          name="_passwd"
          id="passwd"
          placeholder="비밀번호를 입력해주세요."
          maxLength={16}
          {...register("_passwd", {
            // required: "입력되지 않았습니다.",
          })}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="_passwd"
        render={({ message }) => (
          <span className="errorMessageWrap">{message}</span>
        )}
      />
      <div>
        <input
          style={{"margin":"4px 0"}}
          type="name"
          name="_name"
          id="signupUsername"
          placeholder="이름을 입력해주세요."
          maxLength={16}
          {...register("_name", {
            // required: "입력되지 않았습니다.",
          })}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="_name"
        render={({ message }) => (
          <span className="errorMessageWrap">{message}</span>
        )}
      />
      <div className="signup-gender">
        <label>
          <input type="radio" value="female" {...register("_gender", { required: "성별을 선택해주세요." })} />
          여성
        </label>
        <label>
          <input type="radio" value="male" {...register("_gender", { required: "성별을 선택해주세요." })} />
          남성
        </label>
      </div>
      <ErrorMessage
        errors={errors}
        name="_gender"
        render={({ message }) => (
          <span className="errorMessageWrap">{message}</span>
        )}
      />
      <div>
        <input
          style={{"margin":"4px 0"}}
          type="birthDate"
          name="_birthDate"
          id="signupUserbirthDate"
          placeholder="생일을 입력해주세요."
          maxLength={16}
          {...register("_birthDate", {
            // required: "입력되지 않았습니다.",
          })}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="_birthDate"
        render={({ message }) => (
          <span className="errorMessageWrap">{message}</span>
        )}
      />
        <button
        type="submit"
        className="widthWideBtn"
        disabled={isSubmitting}
        style={{"marginTop":"10px"}}> 회원가입
        </button>
    </form>
  );
};

export default SignupForm;