import React, { useEffect, useState } from "react";
import "./Page6month.css";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { assert } from "tone/build/esm/core/util/Debug";
import { Flex, Row } from "antd";

const Page6month = () => {
  const [nickname, setNickname] = useState("");
  const month = "1월";
  const [totalPlayCount, setTotalPlayCount] = useState(0);
  const [mostListenedSinger, setMostListenedSinger] = useState("");
  const [mostListenedSingerCount, setMostListenedSingerCount] = useState(0);
  const [mostListenedGenre, setMostListenedGenre] = useState("");
  const [mostListenedGenreCount, setMostListenedGenreCount] = useState(0);
  const [mostListenedSong, setMostListenedSong] = useState("");
  const [mostListenedSongCount, setMostListenedSongCount] = useState(0);
  const { user_id } = useAuth();

  //닉네임 받아오기
  const fetchNickData = async () => {
    console.log(user_id);
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

      setNickname(userData.nickname);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchNickData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("총 들은 곡 수 받아오기 시도 ");
        const totalPlayCountResponse = await axios.get(
          "http://172.10.7.24:80/total-play-count",
          {
            params: {
              user_id: user_id,
            },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(
          "총 들은 곡 수",
          totalPlayCountResponse.data.total_play_count
        );
        setTotalPlayCount(totalPlayCountResponse.data.total_play_count);
      } catch (error) {
        console.log("총 들은 곡 수 받아오기 실패:", error);
      }

      try {
        // console.log("많이 들은 가수 받아오기 시도 ");
        const mostListenedSinger_response = await axios.get(
          "http://172.10.7.24:80/most-listened-singer",
          {
            params: {
              user_id: user_id,
            },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const mostListenedSingerData = mostListenedSinger_response.data;
        // console.log("데이터를 보자", mostListenedSingerData);

        setMostListenedSinger(mostListenedSingerData.most_listened_singer);
        setMostListenedSingerCount(mostListenedSingerData.total_play_count);
        console.log("많이 들은 가수", mostListenedSinger);
        console.log("얼마나 들었는가", mostListenedSingerCount);
      } catch (error) {
        console.log("많이 들은 가수 받아오기 실패:", error);
      }

      try {
        // console.log("많이 들은 장르 받아오기 시도 ");
        const mostListenedGenre_response = await axios.get(
          "http://172.10.7.24:80/most-listened-genre",
          {
            params: {
              user_id: user_id,
            },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const mostListenedGenreData = mostListenedGenre_response.data;
        // console.log("데이터를 보자", mostListenedGenreData);

        setMostListenedGenre(mostListenedGenreData.most_listened_genre);
        setMostListenedGenreCount(mostListenedGenreData.total_play_count);
        console.log("많이 들은 장르", mostListenedGenre);
        console.log("얼마나 들었는가", mostListenedGenreCount);
      } catch (error) {
        console.log("많이 들은 장르 받아오기 실패:", error);
      }

      try {
        // console.log("많이 들은 장르 받아오기 시도 ");
        const mostListenedSong_response = await axios.get(
          "http://172.10.7.24:80/most-listened-song",
          {
            params: {
              user_id: user_id,
            },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const mostListenedSongData = mostListenedSong_response.data;
        console.log("가장 많이 들은 노래 보자", mostListenedSongData);

        setMostListenedSong(mostListenedSongData.most_listened_song);
        setMostListenedSongCount(mostListenedSongData.total_play_count);
        // console.log("가장 많이 들은 노래:", mostListenedSong);
        // console.log("��마나 들었는가", mostListenedSongCount);
      } catch (error) {
        console.log("많이 들은 노래 받아오기 실패:", error);
      }
    };

    fetchData();
  }, [user_id]);
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
              {month}에 총 {totalPlayCount}곡을 들었어요
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
            <div className="most-listened-genre">
              <p className="static-title">가장 많이 들은 장르</p>
              <p className="static-result">
                <p className="mini-text">
                  <span style={{ color: "#97039D", fontWeight: "bolder" }}>
                    {mostListenedGenre}{" "}
                  </span>
                  을{" "}
                </p>
                <p style={{ marginTop: "5px" }}>가장 많이 들었어요</p>
              </p>
              <p className="static-count">{mostListenedGenreCount}회</p>
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
