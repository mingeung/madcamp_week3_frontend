import React from "react";
import "../index.css";

function ProfileItem({ menu, isActive, icon }) {
  return isActive === true ? (
    <div class="flex flex-row justify-center items-center text-white ">
      <div>{icon}</div>
      <p>{menu.name}</p>
    </div>
  ) : (
    <div class="flex flex-row justify-center items-center text-white hover:scale-105 transition-transform duration-200">
      <div>{icon}</div>
      <p>{menu.name}</p>
    </div>
  );
}
export default ProfileItem;
