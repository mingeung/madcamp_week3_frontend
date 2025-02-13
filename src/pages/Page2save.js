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
import instance from "../axiosConfig.js";

const Page2save = () => {
  const navigate = useNavigate();
  const [PressMusic, setPressMusic] = useState(null);
  const [playResults, setPlayResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicIcon, setMusicIcon] = useState("");
  const { user_id } = useAuth();

  //예전 코드
  // useEffect(() => {
  //   // 로컬 스토리지에서 저장된 즐겨찾기 데이터 가져오기
  //   const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  //   setFavorites(storedFavorites);
  //   console.log("favorites 상태 확인:", favorites);
  // }, []);

  //백엔드에 보관함에 넣은 곡들 불러오기

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberId = 1;
        const response = await instance.get(`/favoritesongs/${memberId}`);
        const results = response.data.favoriteSongsList;
        const favoritesongs_trackId = results.map((song) => song.trackId);
        console.log("보관함 : " + favoritesongs_trackId);
        //이 id의 정보를 가져오는 api를 만들고 그 내용을 useState에 저장하고 화면에 나타나게 하게
        try {
          const response = await instance.get(
            `/several-track-info/ids=${favoritesongs_trackId}`
          );
          const results = response.data;
          const favorite_list = results.tracks;
          setFavorites(favorite_list);
        } catch (error) {
          console.log("Error 발생:", favoritesongs_trackId);
        }
        //여러 정보
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFavorite = async (selectedFavorite) => {
    const confirmDelete = window.confirm("보관함에서 삭제하시겠습니까?");

    if (confirmDelete) {
      // // 선택한 노래가 로컬 스토리지의 favorites에서 제거
      // const updatedFavorites = favorites.filter(
      //   (fav) => fav.song_id !== selectedFavorite.song_id
      // );
      // localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      // setFavorites(updatedFavorites);

      try {
        const trackId = selectedFavorite.id;
        setFavorites(
          favorites.filter((favorite) => favorite.tracks.id !== trackId)
        );

        const memberId = 1;
        const response = await instance.delete(
          `/favoritesongs/${trackId}/${memberId}`
        );
        console.log("보관함에서 제거");
      } catch (e) {
        console.log("보관함에서 제거 실패:", e);
      }
    }
  };

  //음원 듣기 -> 새로 만들어야지
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
    let now = new Date().toISOString().slice(0, -1); // 'Z' 제거

    try {
      const postDate = {
        memberId: 1,
        trackId: track.id,
        artistName: track.artists[0].name,
        trackName: track.name,
        date: now,
      };
      // console.log("postDate:", postDate);
      // console.log("track", track.id);

      const response = await instance.post("/playing", postDate);
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
                  src={favorite.album.images[0].url}
                  alt={favorite.album.name}
                />
              </div>

              <div className="song-intro">
                <p className="song-title">{favorite.name}</p>
                <p className="artist">{favorite.artists[0].name}</p>
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
