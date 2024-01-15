//Page2save.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

import fetchSearchResults from "../utils/fetchSearchresults";
import fetchSpotifyToken from "../utils/spotifyApi"; // 토큰 얻는 파일
import fetchPlay from "../utils/fetchPlay";
import "./Page2save.css";

const Page2save = () => {
  const navigate = useNavigate();
  const [PressMusic, setPressMusic] = useState(null);
  const [playResults, setPlayResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 저장된 즐겨찾기 데이터 가져오기
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleFavorite = async (selectedFavorite) => {
    const confirmDelete = window.confirm("보관함에서 삭제하시겠습니까?");

    if (confirmDelete) {
      // 선택한 노래가 로컬 스토리지의 favorites에서 제거
      const updatedFavorites = favorites.filter(
        (fav) => fav.song_id !== selectedFavorite.song_id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    }
  };

  //음원 듣기
  const handlePlayPause = async (PressMusic) => {
    try {
      //클릭된 정보를 PressMusic에서 가져옴
      const access_token = await fetchSpotifyToken(); // access token 받기
      const results = await fetchPlay(access_token, PressMusic.song_id);
      setPlayResults(results);
      window.location.href = results;

      navigate("/playback", { state: { playResults } });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      <p className="save-title">내 보관함</p>

      <div className="save-grid-container">
        <ul className="save-grid">
          {favorites.map((favorite, index) => (
            <li className="save-list" key={index}>
              <img
                className="image"
                src={favorite.image_url}
                alt={favorite.song_title}
              />
              <div className="song-intro">
                <p className="song-title">{favorite.song_title}</p>
                <p className="artist">{favorite.signer_name}</p>
              </div>
              <FaCirclePlay
                onClick={() => handlePlayPause(favorite)}
                className="btn-play"
                color="#7c93c3"
                size={34}
              />

              <FaHeart
                size={30}
                className="btn-favorite"
                onClick={() => handleFavorite(favorite)}
                color="#7c93c3"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page2save;
