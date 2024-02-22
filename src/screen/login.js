import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useEffect } from 'react';
import * as STR from "../../src/service/string";


export default function Login() {
  const {
    handleSubmit,
    register,
    getValues,
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
        if (RES.status === "fail") {
          console.log("fail");
          return;
        }
      })
      .catch((error) => console.log("reducer login error", error));
  };
  
  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if(signUpButton && signInButton && container){
      signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });

      signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
    }

    // Cleanup event listeners
    return () => {
      if(signUpButton) {
        signUpButton.removeEventListener('click', () => {
          container.classList.add("right-panel-active");
        });
      }
      if(signInButton) {
        signInButton.removeEventListener('click', () => {
          container.classList.remove("right-panel-active");
        });
      }
    };
  }, []);


    return (
      <section className="loginWrap" id="Login">
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form action="#" onSubmit={handleSubmit(fnSubmit)}>
            <h1>Exchange Diary</h1>
            <h2>회원가입</h2>
            {/* <div class="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i clasName="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div> */}
            <div>
              <input
                  type="email"
                  name="_useremail"
                  id="signupUserEmail"
                  {...register("_useremail", {
                    required: "입력되지 않았습니다.",
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
                id="signupUserpasswd"
                maxLength={16}
                {...register("_passwd", {
                  required: "입력되지 않았습니다.",
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
            <button>회원가입</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" onSubmit={handleSubmit(fnSubmit)}>
            <h1>Exchange Diary</h1>
            <h2>로그인</h2>
            {/* <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div> */}
            <div>
              <input
                  type="email"
                  name="_useremail"
                  id="loginUserEmail"
                  {...register("_useremail", {
                    required: "입력되지 않았습니다.",
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
                id="loginUserpasswd"
                maxLength={16}
                {...register("_passwd", {
                  required: "입력되지 않았습니다.",
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
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>로그인</h1>
              <p>돌아온걸 축하해!</p>
              <button className="ghost" id="signIn">로그인</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>회원가입</h1>
              <p>회원가입의 같이 일기를 써봐요.</p>
              <button className="ghost" id="signUp">회원가입</button>
            </div>
          </div>
        </div>
      </div>
      </section>
    );
  }