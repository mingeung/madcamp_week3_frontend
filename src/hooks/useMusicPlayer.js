import { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { userMusicSave, userMusicQueueSave } from "../api/music.js";
import usePlayerStore from "../store/usePlayerStore.js";

export default function useMusicPlayer(track) {
  const [isPlaying, setIsPlaying] = useState(false);
  const {
    deviceId,
    currentTrack,
    setCurrentTrack,
    player,
    position,
    setPlayDifferentTrack,
  } = usePlayerStore();
  //시작
  const handlePlayStart = async (track) => {
    console.log("current track:", currentTrack);
    console.log("track:", track);
    try {
      if (currentTrack && track.uri === currentTrack.uri) {
        console.log("같은 곡 다시 실행");
        await instance.put(`/playStart/${deviceId}`, {
          uris: track.uri,
          position_ms: position,
        });
        setPlayDifferentTrack(false);
      } else {
        console.log("다른 곡 실행");
        await instance.put(`/playStart/${deviceId}`, {
          uris: track.uri,
          // position_ms: position,
        });
        setPlayDifferentTrack(true);
      }
      setIsPlaying(true);
      userMusicSave(track);
      userMusicQueueSave(track, deviceId);
      setCurrentTrack(track); //현재 재생중인 목록 저장

      if (player) {
        player.on("player_state_changed", (state) => {
          if (state?.paused) {
            setIsPlaying(false); // 음악이 끝나면 isPlaying을 false로 설정
          }
        });
      }
    } catch (error) {
      console.log("음원 재생하기 실패:", error);
    }
  };

  //정지
  const handlePlayPause = async (track) => {
    try {
      await instance.put(`/playPause/${deviceId}`);
      setCurrentTrack(track);
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
