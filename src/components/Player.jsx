import { useState } from "react";
import "./Player.css";
import PlayCard from "./PlayCard.jsx";
import instance from "../axiosConfig";

function Player({ deviceId }) {
  const [isShuffleMode, setSuhffleMode] = useState(false);
  const [isRepeatMode, setRepeatMode] = useState(false);
  const [repeatState, setRepeatState] = useState("track");

  const turnOffRepeat = async () => {
    try {
      setRepeatMode(false);
      // 동기적으로 실행
      await new Promise((resolve) => {
        setRepeatState("off");
        resolve();
      });
      await instance.put(`/repeatMode/${deviceId}/${repeatState}`);
      console.log("반복재생 끄기");
    } catch (error) {
      console.log("반복재생 끄기 실패:", error);
    }
  };
  const setRepeat = async () => {
    try {
      setRepeatMode(true);
      //동기적으로 실행
      await new Promise((resolve) => {
        setRepeatState("track");
        resolve();
      });
      await instance.put(`/repeatMode/${deviceId}/${repeatState}`);
      console.log("반복재생 켜기");
    } catch (error) {
      console.log("반복재생 켜기 실패:", error);
    }
  };

  const turnOffShuffle = async () => {
    try {
      //   setSuhffleMode(false);
      await new Promise((resolve) => {
        setSuhffleMode(false);
        resolve();
      });
      await instance.put(`/shuffle/${deviceId}/${isShuffleMode}`);
      console.log("셔플재생 끄기");
    } catch (error) {
      console.log("셔플재생 끄기 실패:", error);
    }
  };
  const setShuffle = async () => {
    try {
      //   setSuhffleMode(true);
      await new Promise((resolve) => {
        setSuhffleMode(true);
        resolve();
      });
      await instance.put(`/shuffle/${deviceId}/${isShuffleMode}`);
      console.log("셔플재생 켜기");
    } catch (error) {
      console.log("셔플재생 켜기 실패:", error);
    }
  };

  const skipToPrevious = async () => {
    try {
      await instance.post(`/skipToPrevious/${deviceId}`);
      console.log("이전 곡 재생 ");
    } catch (error) {
      console.log("이전 곡 재생 에러:", error);
    }
  };
  const skipToNext = async () => {
    try {
      await instance.post(`/skipToNext/${deviceId}`);
      console.log("다음 곡 재생 ");
    } catch (error) {
      console.log("다음 곡 재생 에러:", error);
    }
  };

  // jsx => js + x => javascript + xml => javascript + html
  // react => jsx => js, jsx

  return (
    <div>
      <PlayCard />
      {isRepeatMode ? (
        <button onClick={(e) => turnOffRepeat()}>반복재생 취소</button>
      ) : (
        <button onClick={(e) => setRepeat()}>반복재생 하기</button>
      )}

      {isShuffleMode ? (
        <button onClick={(e) => turnOffShuffle()}>셔플재생 취소</button>
      ) : (
        <button onClick={(e) => setShuffle()}>셔플재생 하기</button>
      )}
      <button onClick={(e) => skipToPrevious()}>이전 곡 재생</button>
      <button onClick={(e) => skipToNext()}>다음 곡 재생</button>
    </div>
  );
}

export default Player;
