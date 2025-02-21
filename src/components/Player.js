import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaCircleStop } from "react-icons/fa6";
import "./Player.css";
import instance from "../axiosConfig";

function Player({
  track,
  isPlaying,
  handlePlayPause,
  handlePlayStart,
  handleFavorite,
  musicIcon,
  favorites,
  deviceId,
}) {
  const [isShuffleMode, setSuhffleMode] = useState(false);
  const [isRepeatMode, setRepeatMode] = useState(false);
  const [repeatState, setRepeatState] = useState("");

  const turnOffRepeat = async () => {
    try {
      setRepeatMode(false);
      setRepeatState("off");
      await instance.put(`/repeatMode/${deviceId}/${repeatState}`);
      console.log("반복재생 끄기");
    } catch (error) {
      console.log("반복재생 끄기 실패:", error);
    }
  };
  const setRepeat = async () => {
    try {
      setRepeatMode(true);
      setRepeatState("track");
      console.log("deviceId:", deviceId);

      await instance.put(`/repeatMode/${deviceId}/${repeatState}`);
      console.log("반복재생 켜기");
    } catch (error) {
      console.log("반복재생 켜기 실패:", error);
    }
  };

  const turnOffShuffle = async () => {
    try {
      setSuhffleMode(false);
      await instance.put(`/shuffle/${deviceId}/${isShuffleMode}`);
      console.log("셔플재생 끄기");
    } catch (error) {
      console.log("셔플재생 끄기 실패:", error);
    }
  };
  const setShuffle = async () => {
    try {
      setSuhffleMode(true);
      await instance.put(`/shuffle/${deviceId}/${isShuffleMode}`);
      console.log("셔플재생 켜기");
    } catch (error) {
      console.log("셔플재생 켜기 실패:", error);
    }
  };

  return (
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
    </div>
  );
}

export default Player;
