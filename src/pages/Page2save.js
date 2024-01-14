//Page2save.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Page2save.css";
import { FaRegHeart } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import fetchSearchResults from "../utils/fetchSearchresults";
import fetchSpotifyToken from "../utils/spotifyApi"; // 토큰 얻는 파일
import fetchPlay from "../utils/fetchPlay";

const Page2save = () => {
  const navigate = useNavigate();
  const [PressMusic, setPressMusic] = useState(null);
  const [savedFavorites, setSavedFavorites] = useState([]);
  const [playResults, setPlayResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [heartStates, setHeartStates] = useState(false);

  // 로컬 스토리지에서 저장된 하트 상태 가져오기
  useEffect(() => {
    const storedHeartStates =
      JSON.parse(localStorage.getItem("heartStates")) || {};
    setHeartStates(storedHeartStates);
  }, []);
  //음원 듣기
  const handlePlayPause = async () => {
    try {
      //클릭된 정보를 PressMusic에서 가져옴
      const access_token = await fetchSpotifyToken(); // access token 받기
      const results = await fetchPlay(access_token, PressMusic.id);
      setPlayResults(results);
      window.location.href = results;

      navigate("/playback", { state: { playResults } });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const handleFavorite = async (favorite) => {
    //각 곡의 하트 상태
    const currentHeartState = heartStates[favorite.song_id] || false;
    // 이미 추가한 노래인지 확인
    const isAlreadyAdded = favorites.some(
      (fav) => fav.song_id === favorite.song_id
    );
    //이미 추가한 경우에 제거
    if (isAlreadyAdded) {
      // 이미 추가된 노래라면 제거
      const updatedFavorites = favorites.filter(
        (fav) => fav.song_id !== favorite.song_id
      );
      setFavorites(updatedFavorites);
      removeFavoriteFromLocalStorage(favorite.song_id);
    } else {
      // 추가되지 않은 경우에만 추가
      const newFavorite = {
        song_id: favorite.song_id,
        signer_name: favorite.signer_name,
        song_title: favorite.song_title,
        image_url: favorite.image_url,
      };

      // 현재의 favorites에 새로운 노래 추가
      setFavorites([...favorites, newFavorite]);

      // 로컬 파일로 저장
      saveFavoritesToLocalStorage(newFavorite);
    }

    // 각 곡의 하트 상태를 토글로 변경
    const updatedHeartStates = {
      ...heartStates,
      [favorite.song_id]: !currentHeartState,
    };
    setHeartStates(updatedHeartStates);

    // 로컬 파일로 저장
    localStorage.setItem("heartStates", JSON.stringify(updatedHeartStates));
  };
  //로컬 스토리지에서 제거하는 함수
  const removeFavoriteFromLocalStorage = (songId) => {
    const updatedFavorites = favorites.filter((fav) => fav.song_id !== songId);
    setFavorites(updatedFavorites);

    //로컬 스토리지에서 해당 항목 제거
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // 로컬 파일로 저장하는 함수
  const saveFavoritesToLocalStorage = (favorite) => {
    // 이전에 저장된 데이터 가져오기
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // 새로운 데이터 추가
    const updatedFavorites = [...storedFavorites, favorite];

    // 로컬 스토리지에 저장
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  useEffect(() => {
    // 로컬 스토리지에서 저장된 노래들을 가져오기
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setSavedFavorites(storedFavorites);
  }, []);
  return (
    <div className="container">
      <h1>보관함 페이지 입니다.</h1>
      <div className="grid-container">
        <ul className="grid">
          {savedFavorites.map((favorite, index) => (
            <li className="list" key={index}>
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
                onClick={handlePlayPause}
                className="btn-play"
                color="#7c93c3"
                size={34}
              />
              {heartStates[favorite.song_id] ? (
                <FaHeart
                  size={30}
                  className="btn-favorite"
                  onClick={() => handleFavorite(favorite)}
                  color="#7c93c3"
                />
              ) : (
                <FaRegHeart
                  size={30}
                  className="btn-favorite"
                  onClick={() => handleFavorite(favorite)}
                  color="#7c93c3"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page2save;
