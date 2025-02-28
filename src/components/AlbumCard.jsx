import { useState, useEffect } from "react";

export default function PlayCard({ album }) {
  const [albumName, setAlbumName] = useState("");
  const [artistName, setArtistName] = useState("");

  // album이 변경될 때마다 한 번만 실행되도록 useEffect 사용
  useEffect(() => {
    setAlbumName(album.name);
    setArtistName(album.artists[0].name);
  }, [album]); // album이 바뀔 때만 실행되도록 의존성 배열 추가

  return (
    <div class="flex flex-col justify-start">
      <img
        src={album.images[0].url}
        alt={album.name}
        class="bg-white w-40 h-40 rounded-2xl mb-3"
      />
      <div class="text-white font-bold text-[18px] font-pretendard">
        {albumName}
      </div>
      <div class="text-4 font-pretendard text-gray-400">{artistName}</div>
    </div>
  );
}
