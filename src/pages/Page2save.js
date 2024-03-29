//Page2save.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCircleStop } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { useAuth } from "../AuthContext";
import fetchSearchResults from "../utils/fetchSearchresults";
import fetchSpotifyToken from "../utils/spotifyApi"; // 토큰 얻는 파일
import fetchPlay from "../utils/fetchPlay";
import "./Page2save.css";
import axios from "axios";

const Page2save = () => {
  const navigate = useNavigate();
  const [PressMusic, setPressMusic] = useState(null);
  const [playResults, setPlayResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicIcon, setMusicIcon] = useState("");
  const { user_id } = useAuth();

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
  const handlePlayPause = async (e, PressMusic) => {
    try {
      const access_token = await fetchSpotifyToken();
      e.preventDefault();

      if (isPlaying) {
        await fetchPlay(access_token, PressMusic.song_id, false); //stop
        console.log("isplaying", isPlaying);
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
      } else {
        await fetchPlay(access_token, PressMusic.song_id, true); //play
        setMusicIcon(PressMusic.song_id);
        console.log("musicIcon", musicIcon);
        console.log("isplaying", isPlaying);
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
        //play할 때마다 사용자 노래 기록에 저장
        userMusicSave(PressMusic);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  //사용자 노래 기록 저장
  const userMusicSave = async (track) => {
    try {
      console.log("사용자 노래 저장 시도");
      console.log("user_id", user_id);
      console.log("song_title", track.song_title);
      console.log("singer_name", track.signer_name);
      const save_response = await axios.post(
        "http://172.10.7.24:80/play-song",
        {
          user_id: user_id,
          song_title: track.song_title,
          singer_name: track.signer_name,
        }
      );
    } catch (e) {
      console.log("사용자 노래 기록 저장 오류 발생:", e);
    }
  };

  return (
    <div className="container">
      <p className="save-title">내 보관함</p>

      <div className="save-grid-container">
        <ul className="save-grid">
          {favorites.map((favorite, index) => (
            <li className="save-list" key={index}>
              <div className="img-box">
                <img
                  className="image"
                  src={favorite.image_url}
                  alt={favorite.song_title}
                />
              </div>

              <div className="song-intro">
                <p className="song-title">{favorite.song_title}</p>
                <p className="artist">{favorite.signer_name}</p>
              </div>

              {musicIcon === favorite.song_id && isPlaying ? (
                <FaCircleStop
                  onClick={(e) => handlePlayPause(e, favorite)}
                  className="btn-play"
                  color="#7c93c3"
                  size={34}
                />
              ) : (
                <FaCirclePlay
                  onClick={(e) => handlePlayPause(e, favorite)}
                  className="btn-play"
                  color="#7c93c3"
                  size={34}
                />
              )}
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
