//Log.js
import React from "react";
import "../index.css";
import Chat from "../components/Chat";

const Login = () => {
  // Spotify 로그인 페이지로 이동
  const handleLogin = () => {
    try {
      window.location.href =
        "http://localhost:8080/oauth2/authorization/spotify";
    } catch (error) {
      console.error("Spotify login redirect failed:", error);
    }
  };
  return (
    <div class=" relative w-screen h-screen opacity-100 bg-gray-100 flex flex-row justify-center items-center p-0 gap-0 flex-wrap content-center">
      <div class="absolute left-1/2 top-1/2 w-[448px] h-[528px] transform -translate-x-1/2 -translate-y-1/2  flex flex-col justify-between items-center px-8 py-12 gap-y-0 gap-x-2.5 flex-wrap  rounded-[12px] opacity-100 bg-white shadow-sm">
        <div class="left-[89.52px] top-0 w-[204.95px] h-[288px] flex flex-col justify-center items-center gap-1">
          <div class="left-0 top-0 w-[192px] h-[192px] bg-amber-100 opacity-100">
            로고
          </div>
          <p class="left-[46.97px] top-0 w-[111px] h-[32px] mt-8 opacity-100 text-2xl font-bold leading-8 text-center -tracking-normal text-gray-800 font-roboto">
            환영합니다
          </p>
          <div>
            <p class="left-[-0.52px] top-0 w-[206px] h-[24px] mt-2 opacity-100 font-roboto text-base leading-6 text-center -tracking-normal text-[#4B5563]">
              Spotify 계정으로 로그인하세요
            </p>
          </div>
        </div>
        <Chat/>
        <div
          onClick={handleLogin}
          class="mt-8 my-auto top-[320px] w-[384px] h-[60px] rounded opacity-100 flex flex-row justify-center items-center p-4 px-6 gap-0 flex-wrap content-center bg-[#1DB954] z-10 text-white cursor-pointer hover:bg-green-500 transition"
        >
          {" "}
          <img
            src="src/images/spotify_logo.png"
            alt="spotify_logo"
            class="w=[19.38px] h-[19.38px]"
          />
          Spotify로 로그인
        </div>
        <p class="mt-8 left-[-0.11px] w-[293px] h-5 opacity-100 font-roboto text-[14px] font-normal leading-6 items-center -tracking-normal text-[#6B7280]">
          Spotify 계정으로 간편하게 로그인하실 수 있습니다
        </p>
      </div>
    </div>
  );
};
export default Login;
