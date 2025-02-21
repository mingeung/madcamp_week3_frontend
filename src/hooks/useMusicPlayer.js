import { useEffect, useState } from "react";
import instance from "../axiosConfig.js";
import userMusicSave from "./useMusicSave.js";

export default function useMusicPlayer(
  track,
  currentTrack,
  setCurrentTrack,
  deviceId
) {
  const [isPlaying, setIsPlaying] = useState(false);

  //시작
  const handlePlayStart = async (track) => {
    try {
      console.log("음원재생");
      await instance.put(`/playStart/${deviceId}`, {
        uris: track.uri,
      });

      setIsPlaying(true);

      userMusicSave(track);
      //   setMusicIcon(track.id);
      //   setIsPlayervisible(true);
      setCurrentTrack(track);
    } catch (error) {
      console.log("음원 재생하기 실패:", error);
    }
  };

  //정지
  const handlePlayPause = async () => {
    try {
      await instance.put(`/playPause/${deviceId}`);
      setIsPlaying(false);
    } catch (error) {
      console.log("음원 정지하기 실패:", error);
    }
  };

  useEffect(() => {
    if (track !== currentTrack) {
      setIsPlaying(false);
    }
  }, [currentTrack]);

  return { isPlaying, handlePlayStart, handlePlayPause };
}
