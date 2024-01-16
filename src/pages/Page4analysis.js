//Home.js
import React, { useEffect, useState } from "react";
import "./Page4analysis.css";
import { useAuth } from "../AuthContext";
import axios from "axios";

const Page4analysis = () => {
  // const [nickname, setNickname] = useState("");
  const nickname = "민승";
  const { user_id } = useAuth();
  const [hashtags, setHashtags] = useState([]);
  const [similarSongs, setSimilarSongs] = useState([]);
  const hashtagColors = ["#603F63", "#A85873", "#E37D6E"];
  useEffect(() => {
    console.log("Component mounted");
    const fetchData = async () => {
      console.log("chatgpt api call");
      try {
        setHashtags(["잔잔한", "댄스", "힙한"]);
        setSimilarSongs([]);
      } catch (error) {
        console.error("Error fetching analysis data:", error);
      }
    };

    // Fetch data only once by passing an empty dependency array
    fetchData();
  }, []); // Empty dependency array ensures that the useEffect runs only once

  return (
    <div className="container">
      <div className="analysis-banner">
        <p className="analysis-title">노래 취향 분석</p>
        <p className="analysis-intro">AI가 분석해주는 나의 노래 취향</p>
      </div>
      <div className="analysis-main">
        <p className="analysis-compelete">
          AI가 {nickname}님의 노래 취향을 분석했어요!
        </p>
        <div className="hashtags">
          {hashtags.map((tag, index) => (
            <div
              className="hashtag"
              key={index}
              style={{ backgroundColor: hashtagColors[index] }}
            >
              #{tag}
            </div>
          ))}
        </div>
        <p className="analysis-compelete">비슷한 느낌의 노래 추천</p>
        <div className="similar-songs">
          {similarSongs.map((song, index) => (
            <div key={index}>
              <p>아티스트: "song.artist"</p>
              <p>노래 제목: "song.title"</p>
              <p>노래 ID: "song.song_id"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page4analysis;
