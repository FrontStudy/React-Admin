
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as STR from '../../src/service/string';
import * as ST from '../../src/service/storage';

const LoginForm = () => {

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
        STR.urlLogin,
        {
          email: getValues("_useremail"),
          passwd: getValues("_passwd"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("로그인 됨");
        const RES = res.data;
        if (RES.status === "success") {
          ST.servicesSetStorage(STR.TOKEN, RES.token); 

          setTimeout(() => {
            navigate("/Diarymain");
            window.location.reload();
          }, 1000);
        } else {
          console.log("fail");
        }
        if (RES.status === "success") {
          console.log("success");
          const accessToken = RES.data.jtoken;
          ST.servicesSetStorage(STR.TOKEN, accessToken);
        }
      })
      .catch((error) => console.log("reducer login error", error));
  };


  return (
    <form onSubmit={handleSubmit(fnSubmit)}>
      <h1>Exchange Diary</h1>
      <h2>로그인</h2>
      <div>
        <input
            type="email"
            name="_useremail"
            id="loginUserEmail"
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
            type="password"
            name="_passwd"
            id="passwd01"
            placeholder="비밀번호를 입력해주세요."
            maxLength={16}
            {...register("_passwd", {
                //required: "입력되지 않았습니다.",
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
        <a href="#">비밀번호 찾기</a>
        <button
        type="submit"
        className="widthWideBtn"
        disabled={isSubmitting}
        >
        로그인
        </button>
    </form>
  );
};

export default LoginForm;