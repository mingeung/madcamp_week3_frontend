import useMusicPlayer from "../hooks/useMusicPlayer";
import useFavorites from "../hooks/useFavorite";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCircleStop } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

export default function PlayCard({
  track,
  currentTrack,
  setCurrentTrack,
  deviceId,
  favorites,
  setFavorites,
}) {
  const { isPlaying, handlePlayPause, handlePlayStart } = useMusicPlayer(
    track,
    currentTrack,
    setCurrentTrack,
    deviceId
  );
  const { handleFavorite } = useFavorites(track, favorites, setFavorites);

  return (
    track && (
      <li className="search-list">
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

        {isPlaying ? (
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
      </li>
    )
  );
}
