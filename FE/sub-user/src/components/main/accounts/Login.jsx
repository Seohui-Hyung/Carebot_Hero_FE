import "./Accounts.css";

import { useRef, useState, useContext } from "react";

import { UserProgressContext } from "../../../store/userProgressStore.jsx";

import PageContainer from "../container/PageContainer.jsx";

export default function Login() {
  const userProgressStore = useContext(UserProgressContext);

  const [formIsInvalid, setFormIsInvalid] = useState({
    email: false,
    password: false,
  });

  const emailInput = useRef("");
  const passwordInput = useRef("");

  function handleLogin(event) {
    event.preventDefault();

    const emailIsInvalid = !emailInput.current.value.includes("@");
    if (emailIsInvalid) {
      setFormIsInvalid((prevForm) => {
        return { ...prevForm, email: true };
      });
      return;
    } else {
      setFormIsInvalid((prevForm) => {
        return { ...prevForm, email: false };
      });
    }

    const passwordIsInvalid = passwordInput.current.value.length < 8;
    if (passwordIsInvalid) {
      setFormIsInvalid((prevForm) => {
        return { ...prevForm, password: true };
      });
      return;
    } else {
      setFormIsInvalid((prevForm) => {
        return { ...prevForm, password: false };
      });
    }

    const userInfo = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };

    console.log("로그인");
    userProgressStore.handleLogin(userInfo);
  }
  return (
    <PageContainer title="로그인">
      <form id="login-form" onSubmit={handleLogin}>
        <div className="login-form-row">
          <div className="login-control">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" ref={emailInput} />

            {formIsInvalid.email && (
              <div className="login-control-error">
                <p>유효한 이메일을 입력해 주세요.</p>
              </div>
            )}
          </div>

          <div className="login-control">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              ref={passwordInput}
            />
          </div>

          {formIsInvalid.password && (
            <div className="login-control-error">
              <p>비밀번호는 8자 이상입니다.</p>{" "}
            </div>
          )}
        </div>

        <p className="login-form-action">
          <button type="submit" className="login-btn">
            Login
          </button>
        </p>
      </form>
    </PageContainer>
  );
}
