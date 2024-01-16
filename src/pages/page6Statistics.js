import React, { useEffect, useState } from "react";
import "./Page6Statistics.css";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { assert } from "tone/build/esm/core/util/Debug";
import { Flex, Row } from "antd";
import { useNavigate } from "react-router-dom";

const Page6statistics = () => {
  const nickname = "민승";
  const navigate = useNavigate();
  const onClickGoMonth = () => {
    navigate("/page6month");
  };

  return (
    <div className="static1-container">
      <div className="static-banner">
        <p className="static-head-title">통계</p>
        <p className="static-intro">{nickname}님이 많이 들은 노래</p>
      </div>
      <button onClick={onClickGoMonth}>월간 통계 보러 가기</button>
    </div>
  );
};

export default Page6statistics;
