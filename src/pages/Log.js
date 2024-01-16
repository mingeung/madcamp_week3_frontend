//Log.js
// import axios from "axios";
import axios from "../axiosConfig";
import React, { useState, useEffect } from "react";
import SignUp from "./SignUp";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import "./Log.css";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [responseData, setResponseData] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);

  //input data의 변화가 있을 때마다 value 값을 변경해서 useState 해준다.
  const handleInputId = (e) => {
    setInputId(e.target.value);
    updateIsLoginButtonDisabled();
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
    updateIsLoginButtonDisabled();
  };

  //회원가입 페이지 이동
  const onClickSignUp = () => {
    navigate("/signup");
  };
  //바로 홈화면 이동
  const onClickPass = () => {
    navigate("/home");
  };

  //login 버튼 클릭 이벤트
  const onClickLogin = async () => {
    try {
      const response = await axios.post("http://172.10.7.24:80/login", {
        user_id: inputId,
        password: inputPw,
      });

      setResponseData(response.data);
      const user = response.data.user;

      navigate("/home");
      login(user.user_id);
      console.log(user.user_id);
    } catch (e) {
      console.log("오류 발생:", e);
    }
  };

  const updateIsLoginButtonDisabled = () => {
    if (inputId !== "" && inputPw !== "") {
      setIsLoginButtonDisabled(false);
    } else {
      setIsLoginButtonDisabled(true);
    }
  };

  return (
    <div className="login">
      <div className="total-container">
        <h2 className="login-title">음악을 프로답게 즐겨보세요</h2>
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
              className={`login-button ${
                isLoginButtonDisabled ? "disabled" : "enabled"
              }`}
              disabled={isLoginButtonDisabled}
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
