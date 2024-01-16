//Page1profile.js
import React, { useState, useRef, useEffect } from "react";
import "./Page1profile.css";
import { Avatar } from "antd";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { upload } from "@testing-library/user-event/dist/upload";
import { Navigate, useNavigate } from "react-router-dom";

const Page1profile = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [Image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const fileInput = useRef(null);
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { user_id, logout } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      console.log(user_id);
      try {
        const response = await axios.get("http://172.10.7.24:80/users", {
          params: {
            user_id: user_id,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        const userData = response.data;
        setUserId(userData.user_id);
        setUserEmail(userData.email);
        setNickname(userData.nickname);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user_id) {
      fetchUserData();
    }
  }, [user_id]);

  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setImage(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    uploadImage(user_id, Image);

    console.log("image2", Image);
  };
  //backend에 이미지 업로드
  const uploadImage = async (user_id, imageUrl) => {
    try {
      const response = await axios.put(
        `http://172.10.7.24:80/upload_image/${user_id}`,
        { imageurl: imageUrl }
      );

      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.log("Image upload error:", error);
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
              <p className="bold-text">아이디</p>
              <p className="user-info">{userId}</p>
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
