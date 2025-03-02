//App.js
import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Log from "./pages/Log";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Profile from "./pages/Page1profile";
import Save from "./pages/Page2save";
import Chat from "./pages/Page3chat";
import Analysis from "./pages/Page4analysis";
import Composition from "./pages/Page5composition";
import SearchResults from "./components/SearchResults";
import ResultComposition from "./pages/Page5resultComposition";
import Page3chatRock from "./pages/Page3chatRock";
import Page6month from "./pages/Page6month";
import Player from "./components/Player";
import Header from "./components/Header";

//App -> hader.js ->haeder.css
const App = () => {
  const location = useLocation();
  return (
    <div class="bg-black">
      {/* 
        로그인 페이지와 회원가입 페이지에서는 Header와 Sidebar를 나타나지 않도록 조건부 렌더링
      */}
      {location.pathname !== "/" && location.pathname !== "/signup" && (
        <>
          <Sidebar />
        </>
      )}
      <Routes>
        <Route path="/" element={<Log />} />
        {/* path"/"첫화면" */}
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
        <Route path="/month-analysis" element={<Page6month />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
};
export default App;
