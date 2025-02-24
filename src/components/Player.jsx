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
  const [currentPosition, setCurrentPosition] = useState(0);
  const [track, setTrack] = useState(null);
  const [newPosition, setNewPosition] = useState(0);
  const { handlePlayPause, handlePlayStart } = useMusicPlayer(track);
  const { handleFavorite } = useFavorites(track, favorites, setFavorites);
  const {
    deviceId,
    currentTrack,
    setCurrentTrack,
    position,
    duration,
    player,
  } = usePlayerStore();

  useEffect(() => {
    const fetchPlaybackState = async () => {
      try {
        const response = await instance.get("/playbackState");
        const nowTrack = response.data.item;
        setTrack(nowTrack);
      } catch (e) {
        console.log("재생상태 받아오기 오류:", e);
      }
    };
    fetchPlaybackState();
  }, [currentTrack]);

  // 막대바 실시간 업데이트
  useEffect(() => {
    if (!duration) return;
    const updateProgressBar = () => {
      if (position !== null && duration && player) {
        setCurrentPosition((prevPosition) => {
          const newPosition = prevPosition + 1000; // 1초 증가
          setNewPosition(newPosition);
          if (newPosition >= duration) return duration; // 노래 길이를 초과하지 않도록 설정
          return newPosition;
        });
      }
    };
    const intervalId = setInterval(updateProgressBar, 1000); // 1초마다 업데이트

    return () => clearInterval(intervalId);
  }, [duration]); // duration이 바뀔 때마다 useEffect 실행

  useEffect(() => {
    setCurrentPosition(0); // 새로운 트랙이 시작될 때 막대 초기화
  }, [currentTrack]); // currentTrack이 바뀔 때마다 실행

  const progress = (currentPosition / duration) * 100; // 막대바 진행률 계산

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
      setCurrentTrack(getUserMusicQueue()); //한박자씩 밀림
      await instance.post(`/skipToNext/${deviceId}`);
      console.log("다음 곡 재생 ");
    } catch (error) {
      console.log("다음 곡 재생 에러:", error);
    }
  };

  function formatTime(durationInSeconds) {
    const totalSeconds = Math.floor(durationInSeconds);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} : ${seconds}`;
  }

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

          {player ? (
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

        <div>
          <div
            className="progress-bar"
            style={{ width: "100%", background: "#eee", height: "10px" }}
          >
            <div
              className="progress"
              style={{
                width: `${progress}%`,
                background: "green",
                height: "100%",
              }}
            ></div>
            <p className="progress-bar-time">
              {formatTime(newPosition / 1000)}
            </p>
            <p className="progress-bar-time"> {formatTime(duration / 1000)}</p>
          </div>
        </div>
      </div>
    )
  );
}

export default Player;
