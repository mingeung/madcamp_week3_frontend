import { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { userMusicSave } from "../api/music.js";
import usePlayerStore from "../store/usePlayerStore.js";

export default function useMusicPlayer(track) {
  const [isPlaying, setIsPlaying] = useState(false);

  const { deviceId, setCurrentTrack, currentTrack } = usePlayerStore();

  //시작
  const handlePlayStart = async (track) => {
    try {
      console.log("음원재생");
      await instance.put(`/playStart/${deviceId}`, {
        uris: track.uri,
      });

      setIsPlaying(true);
      userMusicSave(track);
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
