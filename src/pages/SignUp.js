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
  const [inputEmail, setInputEmail] = useState("");
  const [responseData, setResponseData] = useState("");

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
  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
  };

  //회원가입 버튼 클릭 이벤트
  const onClickSignUp = async () => {
    console.log("click SignUp");

    try {
      console.log("try 실행");
      const response = await axios.post("http://172.10.7.24:80/register", {
        email: inputEmail,
        user_id: inputSignId,
        nickname: inputNickName,
        password: inputSignPw,
      });
      console.log("await 실행");
      setResponseData(response.data);
      console.log(response.data);
    } catch (e) {
      console.log("오류 발생:", e);
    }
  };

  return (
    <div className="signup">
      <div className="total-container">
        <h2 className="signup-title">회원가입</h2>
        <div className="signup-container">
          <div>
            <input
              className="signup-input-box"
              type="text"
              name="input_email"
              placeholder="이메일"
              value={inputEmail}
              onChange={handleInputEmail}
            />
          </div>
          <div>
            <input
              className="signup-input-box"
              type="text"
              name="input_id"
              placeholder="아이디"
              value={inputNickName}
              onChange={handleInputNickName}
            />
          </div>
          <div>
            <input
              className="signup-input-box"
              type="text"
              name="input_nickname"
              placeholder="닉네임"
              value={inputSignId}
              onChange={handleInputSignId}
            />
          </div>
          <div>
            <input
              className="signup-input-box"
              type="password"
              name="input_pw"
              placeholder="비밀번호"
              value={inputSignPw}
              onChange={handleInputSignPw}
            />
          </div>

          <div>
            <input
              className="signup-input-box"
              type="password"
              name="input_re_pw"
              placeholder="비밀번호 확인"
              value={inputReSignPw}
              onChange={handleInputReSignPw}
            />
          </div>
          <div>
            <button
              className="signup-button"
              type="button"
              onClick={onClickSignUp}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
