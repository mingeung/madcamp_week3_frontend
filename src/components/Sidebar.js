import React from "react";
import { Link, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import "./Sidebar.css";
import { FaHeart } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { RiMusicFill } from "react-icons/ri";
import { ImParagraphLeft } from "react-icons/im";

function Sidebar() {
  //url의 path 값을 받아올 수 있음
  const pathName = useLocation().pathname;

  const menus = [
    { name: "home", path: "/home" },
    { name: "프로필", path: "/profile" },
    { icon: <FaHeart />, name: "보관함", path: "/save" },
    { icon: <IoChatbubble />, name: "채팅방", path: "/chat" },
    { icon: <FaSearch />, name: "노래 취향 분석", path: "/analysis" },
    { icon: <RiMusicFill />, name: "작곡하기", path: "/composition" },
    { icon: <ImParagraphLeft />, name: "통계", path: "/statistics" },
  ];

  return (
    <div className="sidebar">
      {menus.map((menu, index) => {
        return (
          <Link to={menu.path} key={index}>
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
