// SearchResults.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./SearchResults.css";
import "../pages/Home.js";
import instance from "../axiosConfig.js";
import SpotifyPlayer from "../utils/SpotifyPlayer.js";
import Player from "./Player.js";
import PlayCard from "./PlayCard.js";

function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = location.state?.query || "";
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchMusic, setSearchMusic] = useState("");
  const [current_track, setCurrentTrack] = useState();
  const [deviceId, setDeviceId] = useState(null);
  const [access_token, setAccessToken] = useState("");

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const response = await instance.get("/accessToken");
        const accessToken = response.data;
        setAccessToken(accessToken);
      } catch (err) {
        console.log("토큰 받아오기 실패:", err);
      }
    };
    getAccessToken();
  }, []);

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
        const response = await instance.get(
          `/searchResult/trackName=${searchQuery}`
        );
        const results = response.data;
        setSearchResults(results);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [searchQuery]);

  // 🎯 SpotifyPlayer에서 deviceId를 전달받는 콜백
  const handleDeviceReady = (id) => {
    setDeviceId(id);
    // console.log("Received Device ID:", id);
  };

  //처음 화면을 로드할 때 백엔드에서 보관함 목록을 가져와서 setFavorites에 담기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/favoritesongs`);
        const results = response.data;
        const favoritesongs_list = results.favoriteSongsList;

        setFavorites(favoritesongs_list.map((song) => song.trackId));
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
              <PlayCard
                track={track}
                currentTrack={current_track}
                setCurrentTrack={setCurrentTrack}
                deviceId={deviceId}
                key={index}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            ))}
            <SpotifyPlayer
              token={access_token}
              onDeviceReady={handleDeviceReady}
            />
          </ul>
        )}
      </div>
      {/* {current_track != null && (
        <Player
          track={current_track}
          isPlaying={isPlaying}
          handlePlayPause={handlePlayPause}
          handlePlayStart={handlePlayStart}
          handleFavorite={handleFavorite}
          musicIcon={musicIcon}
          favorites={favorites}
          deviceId={deviceId}
        />
      )} */}
    </div>
  );
}
export default SearchResults;
