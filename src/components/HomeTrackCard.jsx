import { useState, useEffect } from "react";
import instance from "../axiosConfig";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCircleStop } from "react-icons/fa6";
import useMusicPlayer from "../hooks/useMusicPlayer";

export default function HomeTrackCard({ favoriteTrack }) {
  const [track, setTrack] = useState();

  const { isPlaying, handlePlayPause, handlePlayStart } = useMusicPlayer(track);

  useEffect(() => {
    const getTrackInfo = async () => {
      try {
        const response = await instance.get(
          `/track-info/${favoriteTrack.trackId}`
        );
        const trackInfo = response.data.tracks[0];
        setTrack(trackInfo);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    getTrackInfo();
  }, []);

  return (
    track && (
      <div class="flex flex-row  justify-between">
        <div class="flex flex-row justify-start gap-5 items-center">
          <img
            class="w-[52px] h-[52px] rounded-[4px]"
            src={track.album.images[0].url}
            alt={track.album.name}
          />

          <div class="flex flex-col">
            <div class="text-white text-[18px] font-pretendard">
              {track.name}
            </div>
            <div class="text-[14px] font-pretendard text-gray-400">
              {track.artists[0].name}
            </div>
          </div>
        </div>
        <div>
          {isPlaying ? (
            <FaCircleStop
              onClick={(e) => handlePlayPause(track)}
              color="#FFFFFF"
              size={26}
            />
          ) : (
            <FaCirclePlay
              onClick={(e) => handlePlayStart(track)}
              color="#FFFFFF"
              size={26}
            />
          )}
        </div>
      </div>
    )
  );
}
