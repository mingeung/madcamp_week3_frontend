import { useState } from "react";
import instance from "../axiosConfig";

export default function useFavorites(track, favorites, setFavorites) {
  //post하기 - 보관함에 추가
  const saveFavorites = async (trackId) => {
    try {
      //하트색깔변하게
      setFavorites([...favorites, trackId]);
      const postDate = {
        trackId: trackId,
      };
      await instance.post("/favoritesongs", postDate);
      // console.log("보관함에 추가");
    } catch (e) {
      console.log("보관함 저장 실패:", e);
    }
  };

  //delete -보관함에서 제거
  const deleteFromFavorites = async (trackId) => {
    try {
      setFavorites(favorites.filter((favorite) => favorite !== trackId));

      await instance.delete(`/favoritesongs/${trackId}`);
      // console.log("보관함에서 제거");
    } catch (e) {
      console.log("보관함에서 제거 실패:", e);
    }
  };

  const handleFavorite = async (track) => {
    const trackId = track.id;
    const response = await instance.get(`/favoritesongs/${trackId}`); // 여기에서 오류가 발생함
    const isAlreadyAdded = response.data;

    //이미 추가한 경우에 제거
    if (isAlreadyAdded) {
      deleteFromFavorites(trackId);
      //보관함에 없으면 추가
    } else {
      saveFavorites(trackId);
    }
  };
  return { handleFavorite };
}
