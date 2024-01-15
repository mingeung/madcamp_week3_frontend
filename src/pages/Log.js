//Log.js
// import axios from "axios";
import axios from "../axiosConfig";
import React, { useState, useEffect } from "react";
import SignUp from "./SignUp";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import "./Log.css";

const Login = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [responseData, setResponseData] = useState("");
  const navigate = useNavigate();

  //input data의 변화가 있을 때마다 value 값을 변경해서 useState 해준다.
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
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
    console.log("click login");
    console.log("id:", inputId, "password:", inputPw);
    try {
      console.log("try 실행");
      const response = await axios.post("http://172.10.7.24:80/login", {
        user_id: inputId,
        password: inputPw,
      });
      console.log("await 실행");
      setResponseData(response.data);
      console.log(inputId, inputPw);
      console.log(response.data);
    } catch (e) {
      console.log("오류 발생:", e);
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

// # 로그인 API 엔드포인트
// @app.route('/login', methods=['POST'])
// def login():
//     data = request.json
//     user_id = data.get('user_id')
//     password = data.get('password')

//     if not user_id or not password:
//         return jsonify({'error': '아이디와 비밀번호를 입력하세요.'}), 400

//     user = User.query.filter_by(user_id=user_id).first()
//     if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
//         # 로그인 성공 시 사용자 프로필 반환
//         return jsonify({'user_id': user.user_id, 'email': user.email, 'nickname': user.nickname})
//     else:
//         # 로그인 실패 시 null 반환
//         return jsonify({'error': '로그인 실패'}), 401
