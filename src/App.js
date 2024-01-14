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

  useEffect(() => {
    // Navigate to the login page
    navigate("/login");
  }, []);

  return (
    <div>
      {/* 
        로그인 페이지와 회원가입 페이지에서는 Header와 Sidebar를 나타나지 않도록 조건부 렌더링
      */}
      {window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup" && (
          <>
            <Header />
            <Sidebar />
          </>
        )}

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
    </div>
  );
}

export default App;
