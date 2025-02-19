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
import instance from "../axiosConfig.js";
import SpotifyPlayer from "../utils/SpotifyPlayer.js";
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
  //spotify player
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState();

  const [player, setPlayer] = useState(undefined);

  const [deviceId, setDeviceId] = useState(null);

  const access_token =
    "BQA3zgX12JtzQQOgZ4icimaIutNLTnO_1d0rA15t6MvqDeCQ0MfBiYjbqOusKrzf9PUoZreB9ea-ad5IEFxAUaGTMxB6fUlpUVbrSPYPhbn5_Zy9BNp1aXWi0CaoaJaAx10Fq9zZfC_KUlmAxs2ELWvoCz9yxevWIuAOlHLSNWtEgIw27meqLCabIAWJoW4F8raAXXTYLOHz1yIsYWG7ziB8jvwQ4MbBTHCNXfr_Rvbdopme09UFPrcWw9I-JP_q";

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
        console.log("검색결과 가져오기: ", results);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [searchQuery]);

  // 🎯 SpotifyPlayer에서 deviceId를 전달받는 콜백
  const handleDeviceReady = (id) => {
    // console.log("Received Device ID:", id);
    setDeviceId(id);
  };

  //음원 듣기
  const handlePlayStart = async (track) => {
    const trackUri = track.uri;
    try {
      console.log("음원재생");
      const response = await instance.put(
        `/playStart/${deviceId}/${access_token}`,
        { uris: trackUri }
      );
      setIsPlaying(true);
      setMusicIcon(track.id);
    } catch (error) {
      console.log("음원 재생하기 실패:", error);
    }
  };

  //재생 pause 안됨
  const handlePlayPause = async () => {
    try {
      console.log("음원 정지");
      const response = await instance.put(
        `/playPause/${deviceId}/${access_token}`
      );
      setIsPlaying(false);
    } catch (error) {
      console.log("음원 정지하기 실패:", error);
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

  //post하기 - 보관함에 추가
  const saveFavorites = async (trackId) => {
    try {
      //하트색깔변하게
      setFavorites([...favorites, trackId]);
      const postDate = {
        memberId: 1,
        trackId: trackId,
      };
      const response = await instance.post("/favoritesongs", postDate);
      console.log("보관함에 추가");
    } catch (e) {
      console.log("보관함 저장 실패:", e);
    }
  };

  //delete -보관함에서 제거
  const deleteFromFavorites = async (trackId) => {
    try {
      setFavorites(favorites.filter((favorite) => favorite !== trackId));

      const memberId = 1;
      const response = await instance.delete(
        `/favoritesongs/${trackId}/${memberId}`
      );
      console.log("보관함에서 제거");
    } catch (e) {
      console.log("보관함에서 제거 실패:", e);
    }
  };

  //favorites
  const handleFavorite = async (track) => {
    const trackId = track.id;
    const memberId = 1;
    const response = await instance.get(
      `/favoritesongs/${trackId}/${memberId}`
    ); // 여기에서 오류가 발생함
    const isAlreadyAdded = response.data;
    console.log("trackId" + track.id);
    //이미 추가한 경우에 제거
    if (isAlreadyAdded) {
      deleteFromFavorites(trackId);
      //보관함에 없으면 추가
    } else {
      saveFavorites(trackId);
    }
  };

  //처음 화면을 로드할 때 백엔드에서 보관함 목록을 가져와서 setFavorites에 담기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberId = 1;
        const response = await instance.get(`/favoritesongs/${memberId}`);
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
                    onClick={(e) => handlePlayPause(track)}
                    className="btn-play"
                    color="#7c93c3"
                    size={34}
                  />
                ) : (
                  <FaCirclePlay
                    onClick={(e) => handlePlayStart(track)}
                    className="btn-play"
                    color="#7c93c3"
                    size={34}
                  />
                )}

                {favorites.some((fav) => fav === track.id) ? (
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
                    userMusicSave
                    color="#7c93c3"
                  />
                )}
              </li>
            ))}
            <SpotifyPlayer
              token={access_token}
              onDeviceReady={handleDeviceReady}
            />
          </ul>
        )}
      </div>
    </div>
  );
}
export default SearchResults;
