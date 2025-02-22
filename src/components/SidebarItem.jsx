import React from "react";
import "./Sidebar.css";

function SidebarItem({ menu, isActive, icon }) {
  return isActive === true ? (
    <div className="sidebar-item active">
      <div>{icon}</div>
      <p>{menu.name}</p>
    </div>
  ) : (
    <div className="sidebar-item">
      <div>{icon}</div>
      <p>{menu.name}</p>
    </div>
  );
}

export default SidebarItem;
