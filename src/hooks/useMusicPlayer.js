import { useEffect, useState } from "react";
import instance from "../axiosConfig";
import {
  userMusicSave,
  userMusicQueueSave,
  getUserMusicQueue,
} from "../api/music.js";
import usePlayerStore from "../store/usePlayerStore.js";

export default function useMusicPlayer(track) {
  const [isPlaying, setIsPlaying] = useState(false);

  const { deviceId, currentTrack, setCurrentTrack, player } = usePlayerStore();

  //시작
  const handlePlayStart = async (track) => {
    try {
      await instance.put(`/playStart/${deviceId}`, {
        uris: track.uri,
      });
      console.log("음원재생");
      setIsPlaying(true);
      userMusicSave(track);
      userMusicQueueSave(track, deviceId);
      setCurrentTrack(track); //현재 재생중인 목록 저장

      if (player) {
        console.log("플레이어 상태 변경 이벤트 리스너 추가");
        // 음악 시작 시 상태 변경 이벤트 리스너 추가
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
      console.log("음원 정지");
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
