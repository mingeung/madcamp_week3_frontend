//Log.js
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [inputSignId, setInputSignId] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputSignPw, setInpuSigntPw] = useState("");
  const [inputReSignPw, setInputReSignPw] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [responseData, setResponseData] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [doubleCheckPassword, setDoubleCheckPassword] = useState(false);
  const [isSignUpButtonDisabled, setIsSignUpButtonDisabled] = useState(true);

  const updateSignUpButtonState = () => {
    if (
      checkEmail &&
      checkPassword &&
      doubleCheckPassword &&
      inputNickName !== "" &&
      inputEmail !== ""
    ) {
      setIsSignUpButtonDisabled(false);
    } else {
      setIsSignUpButtonDisabled(true);
    }
  };

  useEffect(() => {
    updateSignUpButtonState();
  }, [
    checkEmail,
    checkPassword,
    doubleCheckPassword,
    inputNickName,
    inputEmail,
  ]);

  const handleInputSignId = (e) => {
    setInputSignId(e.target.value);
    updateSignUpButtonState();
  };
  const handleInputNickName = (e) => {
    setInputNickName(e.target.value);
    updateSignUpButtonState();
  };
  //email & 비밀번호 정규식
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

  const emailCheck = (username) => {
    console.log("이메일 유효성 검사: ", emailRegEx.test(username));
    if (emailRegEx.test(username) === false) {
      setCheckEmail(false);
    } else {
      setCheckEmail(true);
    }
  };
  const passwordCheck = (password) => {
    if (password.match(passwordRegEx) === null) {
      setCheckPassword(false);
      return;
    } else {
      // 맞을 경우 출력
      setCheckPassword(true);
    }
  };
  const passwordDoubleCheck = (password, passwordChk) => {
    if (password !== passwordChk) {
      setDoubleCheckPassword(false);
      return;
    } else {
      setDoubleCheckPassword(true);
    }
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

      if (response.data.success === "회원가입 성공") {
        // 회원가입 성공 시에만 페이지 이동
        navigate("/login");
      } else {
        // 회원가입 실패 시에는 필요한 처리를 추가할 수 있습니다.
        console.log("회원가입 실패:", response.data.message);
      }
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
            {inputEmail.length > 0 && checkEmail === false && (
              <p className="signup-alert">이메일 형식을 확인해주세요</p>
            )}
            <input
              className="signup-input-box"
              type="text"
              name="input_email"
              placeholder="이메일"
              value={inputEmail}
              onChange={(e) => {
                setInputEmail(e.target.value);
                emailCheck(e.target.value);
                updateSignUpButtonState();
              }}
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
            {inputSignPw.length > 0 && checkPassword === false && (
              <p className="signup-alert">
                비밀번호 형식을 확인해주세요(영문 숫자 조합 8자 이상)
              </p>
            )}
            <input
              className="signup-input-box"
              type="password"
              name="input_pw"
              placeholder="비밀번호"
              value={inputSignPw}
              onChange={(e) => {
                setInpuSigntPw(e.target.value);
                passwordCheck(e.target.value);
                updateSignUpButtonState();
              }}
            />
          </div>

          <div>
            {inputReSignPw.length > 0 && doubleCheckPassword === false && (
              <p className="signup-alert">비밀번호가 일치하지 않습니다.</p>
            )}
            <input
              className="signup-input-box"
              type="password"
              name="input_re_pw"
              placeholder="비밀번호 확인"
              value={inputReSignPw}
              onChange={(e) => {
                setInputReSignPw(e.target.value);
                passwordDoubleCheck(inputSignPw, e.target.value);
                updateSignUpButtonState();
              }}
            />
          </div>

          <div>
            <button
              className={`signup-button ${
                isSignUpButtonDisabled ? "disabled" : "enabled"
              }`}
              type="button"
              onClick={onClickSignUp}
              disabled={isSignUpButtonDisabled}
            >
              회원가입
            </button>
            <p style={{ color: "#ffffff" }}>
              {/* {" "}
              {checkEmail && "checkEmail True\n"}
              {checkPassword && "checkPassword True\n"}
              {doubleCheckPassword && "doublecheckPassword True\n"}
              {inputNickName !== "" && "nickname ok\n"}
              {inputEmail !== "" && "email ok"}
              {isSignUpButtonDisabled ? "disabled" : "enabled"} */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
