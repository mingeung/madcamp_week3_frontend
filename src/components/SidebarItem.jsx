import React from "react";
import "../index.css";

function SidebarItem({ menu, isActive, icon }) {
  return isActive === true ? (
    <div class="flex flex-row justify-center items-center  text-main-pink mb-5 ">
      <div class="text-[20px]">{icon}</div>
      <p>{menu.name}</p>
    </div>
  ) : (
    <div class="text-[16px] flex flex-row justify-center items-center gap-[10px] text-gray-500 mb-5 hover:text-neutral-300 transition">
      <div>{icon}</div>
      <p>{menu.name}</p>
    </div>
  );
}

export default SidebarItem;
