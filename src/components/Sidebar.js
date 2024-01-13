import React from "react";
import { Link, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import "./Sidebar.css";

function Sidebar() {
  //url의 path 값을 받아올 수 있음
  const pathName = useLocation().pathname;

  const menus = [
    { name: "프로필", path: "/profile" },
    { name: "보관함", path: "/save" },
    { name: "채팅방", path: "/chat" },
    { name: "노래 취향 분석", path: "/analysis" },
    { name: "작곡하기", path: "/composition" },
    { name: "통계", path: "/statistics" },
  ];

  return (
    <div className="sidebar">
      {menus.map((menu, index) => {
        return (
          <Link to={menu.path} key={index}>
            <SidebarItem
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
