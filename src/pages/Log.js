//Log.js
import axios from "../axiosConfig";
import React, { useState, useEffect } from "react";
import SignUp from "./SignUp";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import "./Log.css";
import { useAuth } from "../AuthContext";
import instance from "../axiosConfig.js";

const Login = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [responseData, setResponseData] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);
  //바로 홈화면 이동
  const onClickPass = () => {
    navigate("/home");
  };

  // Spotify 로그인 페이지로 이동
  const handleLogin = () => {
    try {
      window.location.href =
        "http://localhost:8080/oauth2/authorization/spotify";
    } catch (error) {
      console.error("Spotify login redirect failed:", error);
    }
  };
  return (
    <div className="login">
      <div className="total-container">
        <h2 className="login-title">음악을 프로답게 즐겨보세요</h2>
        <div className="login-container">
          <div>
            <button type="button" className="sign-up-box" onClick={handleLogin}>
              Spotify 로그인
            </button>
            <button type="button" onClick={onClickPass}>
              건너뛰기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
