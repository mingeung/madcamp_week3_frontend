import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import ProfileItem from "./Profileitem";
import "../index.css";
import { FaHeart } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { MdOutlineShowChart } from "react-icons/md";
import instance from "../axiosConfig";

function Sidebar() {
  //url의 path 값을 받아올 수 있음
  const pathName = useLocation().pathname;
  const [userProfile, setUserProfile] = useState("");
  const [nickname, setNickname] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await instance.get("/member");

      const memberData = response.data.memberList[0];
      setNickname(memberData.nickname);
      setUserProfile(memberData.imageUrl);
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
        class="w-[50px] h-[50px] rounded-[50%]"
        src={userProfile}
        alt={nickname}
      />
    ),
    name: nickname,
    path: "/profile",
  };
  const menus = [
    {
      icon: <GoHomeFill />,
      name: "home",
      path: "/home",
    },
    {
      icon: <FaHeart />,
      name: "Liked",
      path: "/save",
    },
    {
      icon: <MdOutlineShowChart />,
      name: "Analysis",
      path: "/analysis",
    },
  ];

  return (
    <div class=" fixed top-0 bottom-0 h-100% w-[165px] bg-black">
      <div class="flex flex-col justify-center items-center mt-10">
        <div class="mb-20 flex items-center gap-5 text-white font-bo cursor-pointer">
          <Link to={profileMenu.path} style={{ textDecoration: "none" }}>
            <ProfileItem
              icon={profileMenu.icon}
              menu={profileMenu}
              isActive={pathName === profileMenu.path}
            />
          </Link>
        </div>

        {menus.map((menu, index) => {
          return (
            <Link to={menu.path} key={index} style={{ textDecoration: "none" }}>
              <SidebarItem
                icon={menu.icon}
                menu={menu}
                isActive={pathName === menu.path ? true : false}
                class="font-pretendard cursor-pointer"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
