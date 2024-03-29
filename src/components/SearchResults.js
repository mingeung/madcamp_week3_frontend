// SearchResults.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fetchSearchResults from "../utils/fetchSearchresults";
import fetchSpotifyToken from "../utils/spotifyApi";
import getActiveDeviceId from "../to/getActiveDeviceId";
import { FaRegHeart } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaCircleStop } from "react-icons/fa6";
import fetchPlay from "../utils/fetchPlay";
import { useAuth } from "../AuthContext";
import "./SearchResults.css";
import "../pages/Home.js";
import axios from "axios";
function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = location.state?.query || "";
  const [searchResults, setSearchResults] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeDeviceId, setActiveDeviceId] = useState(null);
  const [playResults, setPlayResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [musicIcon, setMusicIcon] = useState("");
  const [searchMusic, setSearchMusic] = useState("");
  const { user_id } = useAuth();

  useEffect(() => {
    // 로컬 스토리지에서 저장된 즐겨찾기 데이터 가져오기
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []); // 초기 렌더링 시에만 실행

  //검색기능
  const handleSearch = () => {
    navigate(`/search-results`, { state: { query: searchMusic } });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  //검색 기록 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = await fetchSpotifyToken(); // access token 받기
        console.log("access_token:", access_token);
        const results = await fetchSearchResults(access_token, searchQuery); //track 유형의 아이템을 반환
        setSearchResults(results);
        // const deviceId = await getActiveDeviceId(access_token); //사용자의 활성 장치 ? 어디다가 쓰는거지
        // setActiveDeviceId(deviceId);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [location.state?.query]);

  //음원 듣기
  const handlePlayPause = async (e, track) => {
    try {
      const access_token = await fetchSpotifyToken(); // access token 받기
      e.preventDefault();

      if (isPlaying) {
        await fetchPlay(access_token, track.id, false); //stop
        console.log("isplaying", isPlaying);
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
      } else {
        await fetchPlay(access_token, track.id, true); //play
        setMusicIcon(track.id);
        console.log("musicIcon", musicIcon);
        console.log("isplaying", isPlaying);
        console.log("track.id:", track.id);
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
        //play할 때마다 사용자 노래 기록에 저장
        userMusicSave(track);
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
      console.log("song_title", track.name);
      console.log("singer_name", track.artists[0].name);
      const save_response = await axios.post(
        "http://172.10.7.24:80/play-song",
        {
          user_id: user_id,
          song_title: track.name,
          singer_name: track.artists[0].name,
        }
      );
    } catch (e) {
      console.log("사용자 노래 기록 저장 오류 발생:", e);
    }
  };

  const handleFavorite = async (track) => {
    // 이미 추가한 노래인지 확인
    const isAlreadyAdded = favorites.some(
      (favorites) => favorites.song_id === track.id
    );
    //이미 추가한 경우에 제거
    if (isAlreadyAdded) {
      removeFavoriteFromLocalStorage(track.id);
    }

    if (!isAlreadyAdded) {
      // 추가되지 않은 경우에만 추가
      const newFavorite = {
        song_id: track.id,
        signer_name: track.artists[0].name,
        song_title: track.name,
        image_url: track.album.images[0].url,
      };

      setFavorites([...favorites, newFavorite]);

      // 로컬 파일로 저장
      saveFavoritesToLocalStorage(newFavorite);
    }
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

  return (
    <div className="container">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchMusic}
          onChange={(e) => setSearchMusic(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <FaSearch onClick={handleSearch} className="search-button" />
      </div>
      <div className="search-grid-container">
        {searchResults.length > 0 && (
          <ul className="search-grid">
            {searchResults.map((track, index) => (
              <li className="search-list" key={index}>
                <div className="img-box">
                  <img
                    className="image"
                    src={track.album.images[0].url}
                    alt={track.album.name}
                  />
                </div>

                <div className="song-intro">
                  <p className="song-title">{track.name}</p>
                  <p className="artist">{track.artists[0].name}</p>
                </div>

                {musicIcon === track.id && isPlaying ? (
                  <FaCircleStop
                    onClick={(e) => handlePlayPause(e, track)}
                    className="btn-play"
                    color="#7c93c3"
                    size={34}
                  />
                ) : (
                  <FaCirclePlay
                    onClick={(e) => handlePlayPause(e, track)}
                    className="btn-play"
                    color="#7c93c3"
                    size={34}
                  />
                )}
                {favorites.some((fav) => fav.song_id === track.id) ? (
                  <FaHeart
                    size={30}
                    className="btn-favorite"
                    onClick={() => handleFavorite(track)}
                    color="#7c93c3"
                  />
                ) : (
                  <FaRegHeart
                    size={30}
                    className="btn-favorite"
                    onClick={() => handleFavorite(track)}
                    color="#7c93c3"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default SearchResults;
