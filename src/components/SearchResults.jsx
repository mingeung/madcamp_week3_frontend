// SearchResults.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./SearchResults.css";
import "../pages/Home";
import instance from "../axiosConfig";
import SpotifyPlayer from "../utils/SpotifyPlayer.js";
import Player from "./Player.jsx";
import PlayCard from "./PlayCard.jsx";
import usePlayerStore from "../store/usePlayerStore.js";
import "tailwindcss";
import Header from "./Header.jsx";

function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = location.state?.query || "";
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchMusic, setSearchMusic] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const { currentTrack } = usePlayerStore();

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const response = await instance.get("/accessToken");
        const getAccessToken = response.data;
        setAccessToken(getAccessToken);
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
        console.log("검색결과:", results);
        setSearchResults(results);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [searchQuery]);

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
    <div class=" ml-[190px]" className="container">
      <Header />
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
                key={index}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            ))}
            {accessToken.length > 0 && <SpotifyPlayer token={accessToken} />}
          </ul>
        )}
      </div>
      {currentTrack != null && (
        <Player favorites={favorites} setFavorites={setFavorites} />
      )}
    </div>
  );
}
export default SearchResults;
