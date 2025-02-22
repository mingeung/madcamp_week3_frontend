//Page1profile.js
import React, { useState, useRef, useEffect } from "react";
import "./Page1profile.css";
import { Avatar } from "antd";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import instance from "../axiosConfig";

const Page1profile = () => {
  const navigate = useNavigate();
  const [Image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const fileInput = useRef(null);
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { user_id, logout } = useAuth();

  const fetchUserData = async () => {
    try {
      const response = await instance.get("/member");

      const memberData = response.data.memberList[0];
      setUserId(memberData.id);
      setUserEmail(memberData.email);
      setNickname(memberData.nickname);
      setImage(memberData.imageUrl);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  //이미지 업로드
  const onChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // 미리보기 업데이트: 객체 URL 생성 (브라우저 내에서만 유효)
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);

      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const response = await instance.patch("/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        //서버에서 받아오기
        const imageUrl = response.data; //주소는 잘 받아오는데 이걸로 어떻게 백엔드에서 사진을 다시 받아오지?
        const fullImageUrl = `http://localhost:8080${imageUrl}`;
        console.log(fullImageUrl);

        setImage(fullImageUrl);
      } catch (error) {
        console.error("업로드 실패:", error);
      }
    }
  };

  //닉네임 수정
  // 수정하기 버튼 클릭 시 수정 모드 활성화
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 저장 버튼 클릭 시 닉네임 변경
  const handleSaveClick = async () => {
    setNickname(nickname); // 새로운 닉네임 저장
    //백엔드에 수정된 닉네임 저장
    try {
      const response = await instance.patch("/nickname?nickname=" + nickname);
      console.log("닉네임 변경 성공:", response.data);
    } catch (error) {
      console.error("닉네임 변경 실패:", error);
    }
    setIsEditing(false); // 수정 모드 종료
  };

  // 입력란에서 텍스트 변경 시 상태 업데이트
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const onClickLogOut = async () => {
    try {
      const response = await axios.post("http://172.10.7.24:80/logout");
      logout();
      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  const onClickLogIn = () => {
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="box">
        <div className="profile-card"></div>
      </div>
      <div className="profile-text-box">
        <div className="photo-nickname-box">
          <div className="profile-photo">
            <Avatar
              src={Image}
              style={{ margin: "20px" }}
              size={180}
              onClick={() => {
                fileInput.current.click();
              }}
            />
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/jpg, image/png, image/jpeg"
              name="profile_img"
              onChange={onChange}
              ref={fileInput}
            />
          </div>
          {/* <p className="profile-nick-name">{nickname}</p> */}
        </div>
        <div className="email-id-box">
          <div>
            <div className="row-dir">
              <p className="bold-text">닉네임</p>
              <p className="user-info">{nickname}</p>

              {/* <button onClick={() => a++}>변수 let 바꾸기 +{a}</button> */}
              {/* <button onClick={() => setB(b + 1)}>변수 state 바꾸기+{b}</button> */}
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={nickname}
                    onChange={handleNicknameChange}
                  />
                  <button onClick={handleSaveClick}>저장하기</button>
                </div>
              ) : (
                <button className="member-edit" onClick={handleEditClick}>
                  수정하기
                </button>
              )}
            </div>

            <div className="row-dir">
              <p className="bold-email-text">이메일</p>
              <p className="user-email-info">{userEmail}</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      {user_id ? (
        <p className="log-inout" onClick={onClickLogOut}>
          로그아웃
        </p>
      ) : (
        <p className="log-inout" onClick={onClickLogIn}>
          로그인
        </p>
      )}
    </div>
  );
};

export default Page1profile;
