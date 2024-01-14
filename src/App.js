//App.js
import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import Log from "./pages/Log";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import fetchSpotifyToken from "../src/utils/spotifyApi";
import fetchArtistInfo from "./utils/fetchArtistInfo";
import fetchSearchResults from "./utils/fetchSearchresults";
import Header from "./components/Header";
import Profile from "./pages/Page1profile";
import Save from "./pages/Page2save";
import Chat from "./pages/Page3chat";
import Analysis from "./pages/Page4analysis";
import Composition from "./pages/Page5composition";
import Statistics from "./pages/Page6Statistics";
import SearchResults from "./components/SearchResults";
import ResultComposition from "./pages/Page5resultComposition";
import Page3chatRock from "./pages/Page3chatRock";

function App() {
  const navigate = useNavigate();
  const [artistInfo, setArtistinfo] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    //console에 아티스트 정보가 뜬다.
    const fetchData = async () => {
      try {
        // 액세스 토큰 가져오기
        const accessToken = await fetchSpotifyToken();

        // Radiohead 아티스트 ID (예시)
        const artistId = "4Z8W4fKeB5YxbusRsdQVPb";

        // 아티스트 정보 가져오기
        const info = await fetchArtistInfo(accessToken, artistId);

        //예시: 아티스트 정보를 state에 저장
        setArtistinfo(info);

        // 내가 원하는 노래를 검색 (여기서는 "Imagine"을 검색하도록 예시로 함)
        const query = "Imagine";

        // 검색 결과 가져오기
        const results = await fetchSearchResults(accessToken, query);

        // 가져온 결과를 state에 저장
        setSearchResults(results);

        // 다른 Spotify API 요청이나 액션을 수행할 수 있습니다.
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Navigate to the login page
    navigate("/login");
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/login" element={<Log />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/save" element={<Save />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat-rock" element={<Page3chatRock />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/composition" element={<Composition />} />
        <Route path="/result-composition" element={<ResultComposition />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      {/* {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((track, index) => (
              <li key={index}>
                <strong>{track.name}</strong> by {track.artists[0].name}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}

export default App;
