//Page5resultComposition.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Page5resultComposition.css";
import { MutatingDots } from "react-loader-spinner";
import "./Page5resultComposition.css";
import axios from "../axiosConfig";

export default function Page5resultComposition() {
  const location = useLocation();
  const { state } = location;
  const { selectedGenre, inputTitle, inputSinger } = state || {};
  const [loading, setLoading] = useState(true);
  const nickname = "민승"; //임시 닉네임
  const [lyrics, setLyrics] = useState("");
  const [chord, setChord] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log(selectedGenre);
      console.log(inputTitle);
      console.log(inputSinger);
      try {
        const response = await axios.post(
          "http://172.10.7.24:80/generate-lyrics-and-chord",
          {
            genre: selectedGenre,
            favorite_song: inputTitle,
            favorite_artist: inputSinger,
          }
        );
        //응답에서 lyrics와 chord 정보 추출
        const { generated_lyrics, generated_chord } = response.data;

        setLyrics(generated_lyrics);
        setChord(generated_chord);

        setLoading(false);

        // 여기서 response를 사용하여 필요한 작업 수행
      } catch (error) {
        console.error("에러 발생:", error);
      }
      try {
        const imageResponse = await axios.post(
          "http://172.10.7.24:80/generate-image",
          {
            genre: selectedGenre,
            favorite_song: inputTitle,
            favorite_artist: inputSinger,
          }
        );
        const { image_url } = imageResponse.data;

        setImage(image_url);
        console.log("img:", image_url);
      } catch (error) {
        console.error("이미지 에러 발생:", error);
      }
    };

    fetchData();
  }, [selectedGenre, inputTitle, inputSinger]);

  return (
    <div className="ai-result-container">
      <div className="composition-banner">
        <p className="composition-title">작곡하기</p>
        <p className="composition-intro">
          내가 좋아하는 노래를 직접 만들어 들어요
        </p>
      </div>
      {loading ? (
        <div>
          <MutatingDots
            className="loader"
            height="90"
            width="80"
            radius="13"
            color="#7C93C3"
            ariaLabel="loading"
          />
          <p className="load-text">
            AI가 {nickname}님 취향의 곡을 작곡하는 중이에요
          </p>
        </div>
      ) : (
        <div>
          <p className="generated-by-ai">AI가 만든 곡</p>
          <div className="ai-song">
            <div className="ai-lyrics">{lyrics}!</div>
            <div className="ai-chord">{chord}!</div>
          </div>
          <img src={image} className="ai-result-image" alt="ai-result-image" />
        </div>
      )}
    </div>
  );
}
