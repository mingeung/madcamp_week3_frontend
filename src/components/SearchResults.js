// SearchResults.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fetchSearchResults from "../utils/fetchSearchresults";
import fetchSpotifyToken from "../utils/spotifyApi"; // 토큰 얻는 파일
import getActiveDeviceId from "../to/getActiveDeviceId";
import fetchPlay from "../utils/fetchPlay";

function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = location.state?.query || "";
  const [searchResults, setSearchResults] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeDeviceId, setActiveDeviceId] = useState(null);
  const [PressMusic, setPressMusic] = useState(null);
  const [playResults, setPlayResults] = useState([]);
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
  return (
    <div style={{ marginLeft: "500px" }}>
      <h2>Search Results for "{searchQuery}"</h2>

      <div>
        {searchResults.length > 0 && (
          <div>
            <h2>Search Results</h2>
            <ul>
              {searchResults.map((track, index) => (
                <li key={index}>
                  <strong>{track.name}</strong> by {track.artists[0].name}
                  <p>Release Date: {track.album.release_date}</p>
                  <img
                    src={track.album.images[0].url}
                    alt={track.album.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <button onClick={() => handlePlayPause(track)}>
                    {isPlaying ? "정지" : "재생"}
                  </button>
                  <button>보관함에 담기</button>
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
