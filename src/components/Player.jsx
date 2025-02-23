import { useEffect, useState } from "react";
import "./Player.css";
import instance from "../axiosConfig";
import useMusicPlayer from "../hooks/useMusicPlayer.js";
import usePlayerStore from "../store/usePlayerStore.js";
import useFavorites from "../hooks/useFavorite.js";
import { getUserMusicQueue } from "../api/music.js";

import { FaCirclePlay } from "react-icons/fa6";
import { FaCircleStop } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

function Player({ favorites, setFavorites }) {
  const [isShuffleMode, setSuhffleMode] = useState(false);
  const [isRepeatMode, setRepeatMode] = useState(false);
  const [repeatState, setRepeatState] = useState("track");
  const [isPausing, setIsPausing] = useState(false);
  const [track, setTrack] = useState(null);
  const { handlePlayPause, handlePlayStart } = useMusicPlayer(track);
  const { handleFavorite } = useFavorites(track, favorites, setFavorites);
  const { deviceId, currentTrack, setCurrentTrack } = usePlayerStore();

  useEffect(() => {
    const fetchPlaybackState = async () => {
      try {
        console.log("지금 재생중인 곡 받아오기");

        const response = await instance.get("/playbackState");
        const nowTrack = response.data.item;
        setTrack(nowTrack);
        const pause = response.data.actions.disallows.pausing;
        setIsPausing(pause);
      } catch (e) {
        console.log("재생상태 받아오기 오류:", e);
      }
    };
    fetchPlaybackState();
  }, [currentTrack]);

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
      setCurrentTrack(getUserMusicQueue());
      await instance.post(`/skipToPrevious/${deviceId}`);
      console.log("이전 곡 재생");
    } catch (error) {
      console.log("이전 곡 재생 에러:", error);
    }
  };
  const skipToNext = async () => {
    try {
      setCurrentTrack(getUserMusicQueue());
      // getUserMusicQueue(setCurrentTrack); //한박자씩 밀린다.
      await instance.post(`/skipToNext/${deviceId}`);
      console.log("다음 곡 재생 ");
    } catch (error) {
      console.log("다음 곡 재생 에러:", error);
    }
  };

  return (
    track && (
      <div>
        <div className="search-list">
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

          {isPausing ? (
            <FaCirclePlay
              onClick={(e) => handlePlayStart(track)}
              className="btn-play"
              color="#7c93c3"
              size={34}
            />
          ) : (
            <FaCircleStop
              onClick={(e) => handlePlayPause(track)}
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
        </div>

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
    )
  );
}

export default Player;
