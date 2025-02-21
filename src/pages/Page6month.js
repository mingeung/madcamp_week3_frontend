import React, { useEffect, useState } from "react";
import "./Page6month.css";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { assert } from "tone/build/esm/core/util/Debug";
import { Flex, Row } from "antd";
import instance from "../axiosConfig";

const Page6month = () => {
  const [nickname, setNickname] = useState("");
  const today = new Date();
  const month = today.getMonth() + 1;
  const [totalPlayCount, setTotalPlayCount] = useState(0);
  const [mostListenedSinger, setMostListenedSinger] = useState();
  const [mostListenedSingerCount, setMostListenedSingerCount] = useState(0);
  const [mostListenedSong, setMostListenedSong] = useState("");
  const [mostListenedSongCount, setMostListenedSongCount] = useState(0);
  const { user_id } = useAuth();

  useEffect(() => {
    getUserNickname();
    getMostListenArtist();
    getTotalTrack();
    getMostListenTrack();
  }, []);

  const getUserNickname = async () => {
    try {
      const response = await instance.get("/member");

      const memberData = response.data.memberList[0];
      setNickname(memberData.nickname);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  //총 들은 곡 수
  const getTotalTrack = async () => {
    try {
      const response = await instance.get(`/playing`);
      const totalPlayCountResponse = response.data.playingList.length;
      console.log("총 들은 곡 수", totalPlayCountResponse);
      setTotalPlayCount(totalPlayCountResponse);
    } catch (error) {
      console.log(error);
    }
  };

  //많이 들은 가수 불러오기
  const getMostListenArtist = async () => {
    try {
      const response = await instance.get(`/most-month-played-artist`);
      const artist = response?.data?.playingList?.[0]?.artistName;
      const artistCount = response?.data?.playingList?.[0]?.count;
      setMostListenedSinger(artist);
      setMostListenedSingerCount(artistCount);
    } catch (error) {
      console.log(error);
    }
  };

  //가장 많이 들은 곡 불러오기
  const getMostListenTrack = async () => {
    try {
      const response = await instance.get(`/most-month-played-track`);
      const track = response?.data?.playingList?.[0]?.trackName;
      const trackCount = response?.data?.playingList?.[0]?.count;
      setMostListenedSong(track);
      setMostListenedSongCount(trackCount);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="static-container">
      <div className="static-banner">
        <p className="static-head-title">통계</p>
        <p className="static-intro">{nickname}님이 많이 들은 노래</p>
      </div>
      <div className="static-main">
        <div className="static-month">
          <div className="today-month">
            <div>
              {month}월에 총 {totalPlayCount}곡을 들었어요
            </div>
          </div>

          <div className="static-boxs">
            <div className="most-listened-singer">
              <p className="static-title">선호하는 아티스트</p>
              <p className="static-result">
                <p className="mini-text">
                  <span style={{ color: "#320000", fontWeight: "bolder" }}>
                    {mostListenedSinger}
                  </span>
                  을
                </p>
                <p style={{ marginTop: "5px" }}>가장 많이 들었어요</p>
              </p>
              <p className="static-count">{mostListenedSingerCount}회</p>
            </div>

            <div className="most-listened-song">
              <p className="static-title">나의 최애 노래</p>
              <p className="static-result">
                <p className="mini-text">
                  <span style={{ color: "#154235", fontWeight: "bolder" }}>
                    {mostListenedSong}
                  </span>
                  을
                </p>{" "}
                <p style={{ marginTop: "5px" }}>가장 많이 들었어요</p>
              </p>
              <p className="static-count">{mostListenedSongCount}회</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page6month;
