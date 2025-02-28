//Home.js
import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "../components/Header";
import instance from "../axiosConfig";
import AlbumCard from "../components/AlbumCard";
import HomeTrackCard from "../components/HomeTrackCard";

const Home = () => {
  //최근 들은 곡 불러오기
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [newReleasedAlbums, setNewReleasedAlbums] = useState([]);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        const response = await instance.get("/recentlyPlayed");
        setRecentlyPlayed(response.data);

        // console.log("최근 들은 곡 받아오기:", recentlyPlayed);
      } catch (error) {
        console.log("최근 들은 곡 받아오기 실패:", error);
      }
    };
    fetchRecentlyPlayed();
  }, []);

  //최근 발매된 앨범
  useEffect(() => {
    const fetchNewReleasedAlbums = async () => {
      try {
        const response = await instance.get("/newReleasedAlbum");
        const getAlbums = response.data.albums.items;
        setNewReleasedAlbums(getAlbums);
      } catch (error) {
        console.log("최근 발매앨범 받아오기 실패:", error);
      }
    };
    fetchNewReleasedAlbums();
  }, []);

  //보관함에 있는 노래
  useEffect(() => {
    const fetchfavoriteSongs = async () => {
      try {
        const response = await instance.get(`/favoritesongs`);
        const getFavorites = response.data.favoriteSongsList;
        setFavoriteSongs(getFavorites);
        console.log("보관함 받아오기:", favoriteSongs);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchfavoriteSongs();
  }, []);

  return (
    <div class="ml-[190px]">
      <Header />
      <div className="본문">
        <div className="새로나온 앨범">
          <p class="text-white font-pretendard font-bold text-[24px] mb-6">
            New released
          </p>
          {newReleasedAlbums.length > 0 && (
            <ul class="flex flex-row  gap-[30px]">
              {newReleasedAlbums.map((album, index) => (
                <li key={index} className="min-x-max">
                  <AlbumCard album={album} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className="w-[calc((100vw-190px)/2)]"
          class="rounded-2xl bg-dark-gray p-5 mt-12"
        >
          <p class="text-white font-pretendard font-bold text-[24px] mb-6">
            My Tracks
          </p>
          {favoriteSongs.length > 0 && (
            <ul class="flex flex-col gap-4">
              {favoriteSongs.map((favoriteTrack, index) => (
                <li key={index} className="min-x-max">
                  <HomeTrackCard favoriteTrack={favoriteTrack} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="최근 들은 노래"></div>
      </div>
    </div>
  );
};

export default Home;
