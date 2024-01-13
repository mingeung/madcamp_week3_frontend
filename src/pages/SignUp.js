//Log.js
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [inputSignId, setInputSignId] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputSignPw, setInpuSigntPw] = useState("");
  const [inputReSignPw, setInputReSignPw] = useState("");

  //input data의 변화가 있을 때마다 value 값을 변경해서 useState 해준다.
  const handleInputSignId = (e) => {
    setInputSignId(e.target.value);
  };
  const handleInputNickName = (e) => {
    setInputNickName(e.target.value);
  };

  const handleInputSignPw = (e) => {
    setInpuSigntPw(e.target.value);
  };
  const handleInputReSignPw = (e) => {
    setInputReSignPw(e.target.value);
  };

  //회원가입 버튼 클릭 이벤트
  const onClickSignUp = () => {
    console.log("click SignUp");
  };

  return (
    <div className="container">
      <div className="signup-container">
        <h2>회원가입</h2>
        <div>
          <input
            type="text"
            name="input_id"
            placeholder="아이디"
            value={inputNickName}
            onChange={handleInputNickName}
          />
        </div>
        <div>
          <input
            type="text"
            name="input_nickname"
            placeholder="닉네임"
            value={inputSignId}
            onChange={handleInputSignId}
          />
        </div>
        <div>
          <input
            type="password"
            name="input_pw"
            placeholder="비밀번호"
            value={inputSignPw}
            onChange={handleInputSignPw}
          />
        </div>

        <div>
          <input
            type="password"
            name="input_re_pw"
            placeholder="비밀번호 확인"
            value={inputReSignPw}
            onChange={handleInputReSignPw}
          />
        </div>
        <div>
          <button type="button" onClick={onClickSignUp}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
