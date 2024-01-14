// SearchResults.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fetchSearchResults from "../utils/fetchSearchresults";
import fetchSpotifyToken from "../utils/spotifyApi"; // 토큰 얻는 파일
import getActiveDeviceId from "../to/getActiveDeviceId";
import fetchPlay from "../utils/fetchPlay";
import "./SearchResults.css";
import { FaRegHeart } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = location.state?.query || "";
  const [searchResults, setSearchResults] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeDeviceId, setActiveDeviceId] = useState(null);
  const [PressMusic, setPressMusic] = useState(null);
  const [playResults, setPlayResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 저장된 즐겨찾기 데이터 가져오기
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []); // 초기 렌더링 시에만 실행

  //검색 기록 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = await fetchSpotifyToken(); // access token 받기
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
  const handlePlayPause = async (track) => {
    try {
      //클릭된 정보를 PressMusic에 저장
      setPressMusic(track);
      const access_token = await fetchSpotifyToken(); // access token 받기
      const results = await fetchPlay(access_token, track.id);
      setPlayResults(results);
      window.location.href = results;

      navigate("/playback", { state: { playResults } });
    } catch (error) {
      console.log("Error fetching data:", error);
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
      <div className="grid-container">
        {searchResults.length > 0 && (
          <div>
            <ul className="grid">
              {searchResults.map((track, index) => (
                <li className="list" key={index}>
                  {/* <p className="">Release Date: {track.album.release_date}</p> */}

                  <img
                    className="image"
                    src={track.album.images[0].url}
                    alt={track.album.name}
                  />

                  <div className="song-intro">
                    <p className="song-title">{track.name}</p>
                    <p className="artist">{track.artists[0].name}</p>
                    {/* <p className="genres">{track.artists[0].genres}</p> */}
                  </div>

                  <FaCirclePlay
                    onClick={() => handlePlayPause(track)}
                    className="btn-play"
                    color="#7c93c3"
                    size={34}
                  />
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
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
