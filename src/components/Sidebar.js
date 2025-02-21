import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import "./Sidebar.css";
import { FaHeart } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { RiMusicFill } from "react-icons/ri";
import { ImParagraphLeft } from "react-icons/im";
import { useAuth } from "../AuthContext";
import axios from "../axiosConfig";

function Sidebar() {
  //url의 path 값을 받아올 수 있음
  const pathName = useLocation().pathname;
  const [userProfile, setUserProfile] = useState("");
  const { user_id } = useAuth();

  const fetchUserData = async () => {
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

      setUserProfile(userData.imageurl);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const profileMenu = {
    icon: (
      <img
        style={{ width: "80px", borderRadius: "50px" }}
        src={userProfile}
        alt="프로필"
      />
    ),
    // name: "프로필",
    path: "/profile",
  };
  const menus = [
    { name: "home", path: "/home" },
    profileMenu,
    { icon: <FaHeart />, name: "보관함", path: "/save" },
    { icon: <IoChatbubble />, name: "채팅방", path: "/chat" },
    { icon: <FaSearch />, name: "노래 취향 분석", path: "/analysis" },
    { icon: <RiMusicFill />, name: "작곡하기", path: "/composition" },
    { icon: <ImParagraphLeft />, name: "통계", path: "/Page6month" },
  ];

  return (
    <div className="sidebar">
      {menus.map((menu, index) => {
        return (
          <Link to={menu.path} key={index} style={{ textDecoration: "none" }}>
            <SidebarItem
              icon={menu.icon}
              menu={menu}
              isActive={pathName === menu.path ? true : false}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default Sidebar;
