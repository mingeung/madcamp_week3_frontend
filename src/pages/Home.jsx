//Home.js
import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "../components/Header";
import instance from "../axiosConfig";
import AlbumCard from "../components/AlbumCard";

const Home = () => {
  //최근 들은 곡 불러오기
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [newReleasedAlbums, setNewReleasedAlbums] = useState([]);

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        const response = await instance.get("/recentlyPlayed");
        setRecentlyPlayed(response.data);

        console.log("최근 들은 곡 받아오기:", recentlyPlayed);
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
        console.log("최근 발매 앨범 받아오기:", getAlbums);
      } catch (error) {
        console.log("최근 발매앨범 받아오기 실패:", error);
      }
    };
    fetchNewReleasedAlbums();
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
            <ul class="flex flex-row overflow-x-auto gap-[30px]">
              {newReleasedAlbums.map((album, index) => (
                <li key={index} className="min-x-max">
                  <AlbumCard album={album} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="내 보관함"></div>
        <div className="최근 들은 노래"></div>
      </div>
    </div>
  );
};

export default Home;
