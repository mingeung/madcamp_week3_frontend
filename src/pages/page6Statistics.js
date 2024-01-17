import React, { useEffect, useState } from "react";
import "./Page6Statistics.css";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { assert } from "tone/build/esm/core/util/Debug";
import { Flex, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { configConsumerProps } from "antd/es/config-provider";
import styled from "styled-components";
import { PieChart } from "react-minimal-pie-chart";
import { Pie } from "@nivo/pie";

const Page6statistics = () => {
  const { user_id } = useAuth();
  const nickname = "민승";
  const navigate = useNavigate();
  const [monthStatic, setMonthStatic] = useState([]);
  const [weekStatic, setWeekStatic] = useState([]);
  const onClickGoMonth = () => {
    navigate("/page6month");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const month_response = await axios.post(
          "http://172.10.7.24:80/month-genre",
          {
            user_id: user_id,
          }
        );
        const monthGenre = month_response.data.genre_ratio;

        setMonthStatic(monthGenre);
        console.log("월간 통계:", monthStatic);
        const numberOfProperties = Object.keys(monthStatic).length;
        console.log(monthStatic);
      } catch (e) {
        console.log("월간 통계 오류 발생", e);
      }

      try {
        const week_response = await axios.post(
          "http://172.10.7.24:80/week-genre",
          {
            user_id: user_id,
          }
        );
        const weekGenre = week_response.data.genre_ratio;

        setWeekStatic(weekGenre);
        console.log("주간 통계:", weekStatic);
      } catch (e) {
        console.log("주간 통계 오류 발생", e);
      }
    };
    fetchData();
  }, []);
  const monthpastelColors = [
    "#FFE5E5",
    "#AC87C5",
    "#E0AED0",
    "#FF1493",
    "#FFE7C1",
    "#F3CCF3",
    "#756AB6",
  ];
  const weekpastelColors = [
    "#EC8F5E",
    "#F3B664",
    "#F1EB90",
    "#9FBB73",
    "#706233",
    "#B0926A",
    "#FAE7C9",
  ];

  const monthPieChartData = Object.entries(monthStatic).map(
    ([label, value], index) => ({
      title: `${label}\n${Math.round(value)}%`,
      value: value * 100,
      color: monthpastelColors[index % monthpastelColors.length],
    })
  );
  const weekPieChartData = Object.entries(weekStatic).map(
    ([label, value], index) => ({
      title: `${label}\n${Math.round(value)}%`,
      value: value * 100,
      color: weekpastelColors[index % weekpastelColors.length],
    })
  );

  return (
    <div className="static1-container">
      <div className="static-banner">
        <p className="static-head-title">통계</p>
        <p className="static-intro">{nickname}님이 많이 들은 노래</p>
      </div>
      <div className="static-sub-title">
        <p className="each-sub-title">월간 통계</p>
        <p className="each-sub-title">주간 통계</p>
      </div>
      <div className="charts">
        <div style={{ width: "500px" }}>
          <PieChart
            data={monthPieChartData}
            label={({ dataEntry }) => dataEntry.title}
            labelPosition={60}
            labelStyle={{
              fill: "#000000",
              fontSize: "2.7px",
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
            radius={30}
          />
        </div>
        <div style={{ width: "500px" }}>
          <PieChart
            data={weekPieChartData}
            label={({ dataEntry }) => dataEntry.title}
            labelPosition={60}
            labelStyle={{
              fill: "#000000",
              fontSize: "2.7px",
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
            radius={30}
          />
        </div>
      </div>
      <button className="go-month-static" onClick={onClickGoMonth}>
        월간 통계 보러 가기
      </button>
    </div>
  );
};

export default Page6statistics;
