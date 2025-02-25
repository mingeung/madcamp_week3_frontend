import { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { userMusicSave, userMusicQueueSave } from "../api/music.js";
import usePlayerStore from "../store/usePlayerStore.js";

export default function useMusicPlayer(track) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [nowPosition, setNowPosition] = useState(0);
  const { deviceId, currentTrack, setCurrentTrack, player, position } =
    usePlayerStore();
  //시작
  const handlePlayStart = async (track) => {
    try {
      if (track === currentTrack) {
        await instance.put(`/playStart/${deviceId}`, {
          uris: track.uri,
          position_ms: position,
        });
      } else {
        await instance.put(`/playStart/${deviceId}`, {
          uris: track.uri,
          // position_ms: position,
        });
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
