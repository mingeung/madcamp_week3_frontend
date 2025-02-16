//Page1profile.js
import React, { useState, useRef, useEffect } from "react";
import "./Page1profile.css";
import { Avatar } from "antd";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { upload } from "@testing-library/user-event/dist/upload";
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
  const { user_id, logout } = useAuth();

  const fetchUserData = async () => {
    // console.log(user_id);
    console.log("fetchUserData실행");
    try {
      console.log("api가져오기 시도");
      const response = await instance.get("/member");
      console.log("response:", response.data.memberList[0]);

      const memberData = response.data.memberList[0];
      setUserId(memberData.id);
      setUserEmail(memberData.email);
      setNickname(memberData.nickname);
      setImage(memberData.imageurl);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  //이미지 업로드
  const onChange = async (e) => {
    if (e.target.files[0]) {
      const imgURL = URL.createObjectURL(e.target.files[0]);
      console.log(imgURL);
      try {
        const response = await axios.put(
          `http://172.10.7.24:80/upload_image/${user_id}`,
          { imageurl: imgURL }
        );

        console.log("Image uploaded successfully:", response.data);
        // 이미지를 업로드한 후에 서버에서 다시 가져옴
        fetchUserData();
      } catch (error) {
        console.log("Image upload error:", error);
      }
    } else {
      // 업로드 취소할 시
      setImage(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
      return;
    }
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
          <p className="profile-nick-name">{nickname}</p>
        </div>
        <div className="email-id-box">
          <div>
            <div className="row-dir">
              <p className="bold-text">닉네임</p>
              <p className="user-info">{nickname}</p>
            </div>

            <div className="row-dir">
              <p className="bold-email-text"> 이메일</p>
              <p className="user-email-info">{userEmail}</p>
            </div>
          </div>
        </div>
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
