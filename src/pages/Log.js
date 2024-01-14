//Log.js
import axios from "axios";
import React, { useState, useEffect } from "react";
import SignUp from "./SignUp";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import "./Log.css";

const Login = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const navigate = useNavigate();

  //input data의 변화가 있을 때마다 value 값을 변경해서 useState 해준다.
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };
  //login 버튼 클릭 이벤트
  const onClickLogin = () => {
    console.log("click login");
  };

  //회원가입 페이지 이동
  const onClickSignUp = () => {
    navigate("/signup");
  };
  //바로 홈화면 이동
  const onClickPass = () => {
    navigate("/home");
  };
  return (
    <div className="login">
      <div className="container">
        <h2>음악을 프로답게 즐겨보세요</h2>
        <div className="login-container">
          <div>
            <input
              className="input-box"
              type="text"
              name="input_id"
              placeholder="아이디"
              value={inputId}
              onChange={handleInputId}
            />
          </div>
          <div>
            <input
              className="input-box"
              type="password"
              name="input_pw"
              placeholder="비밀번호"
              value={inputPw}
              onChange={handleInputPw}
            />
          </div>
          <div>
            <button
              className="login-button"
              type="button"
              onClick={onClickLogin}
            >
              로그인
            </button>
          </div>
          <div className="sign-up-box">
            <p className="sign-up-text">아직 ProMusic의 회원이 아니라면</p>
            <p
              className="go-sign-up"
              onClick={onClickSignUp}
              style={{ color: "white", cursor: "pointer" }}
            >
              회원가입하기{" "}
            </p>
          </div>
          <button type="button" onClick={onClickPass}>
            건너뛰기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
