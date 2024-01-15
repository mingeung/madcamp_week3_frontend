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
        const { generated_lyrics, generated_chord, image } = response.data;

        setLyrics(generated_lyrics);
        setChord(generated_chord);
        setImage(image);
        setLoading(false);
        console.log("image:", image);

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
        const { send_file } = imageResponse.data;

        setImage(send_file);
      } catch (error) {
        console.error("이미지 에러 발생:", error);
      }
    };

    fetchData();
  }, [selectedGenre, inputTitle, inputSinger]);

  return (
    <div className="ai-result-container">
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
          <div>{lyrics}!</div>
          <div>{chord}!</div>
          <img src={image} className="ai-result-image" alt="ai-result-image" />
          <p>{image}</p>
        </div>
      )}
    </div>
  );
}
