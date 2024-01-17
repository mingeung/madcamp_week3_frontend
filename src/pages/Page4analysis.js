//Home.js
import React, { useEffect, useState } from "react";
import "./Page4analysis.css";
import { useAuth } from "../AuthContext";
import axios from "axios";
import fetchSpotifyToken from "../utils/spotifyApi";
import fetchPlay from "../utils/fetchPlay";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCircleStop } from "react-icons/fa6";
import { MutatingDots } from "react-loader-spinner";

const Page4analysis = () => {
  // const [nickname, setNickname] = useState("");
  const nickname = "민승";
  const { user_id } = useAuth();
  const [hashtags, setHashtags] = useState([]);
  const [similarSongs, setSimilarSongs] = useState([]);
  const [coverImg, setCoverImg] = useState([]);
  const [play, setPlay] = useState([]);
  const hashtagColors = ["#603F63", "#A85873", "#E37D6E"];
  const [musicIcon, setMusicIcon] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //ex
        setHashtags(["잔잔한", "댄스", "힙한"]);
        setSimilarSongs([
          {
            artist: "Ariana Grande",
            song_id: "63y6xWR4gXz7bnUGOk8iI6",
            title: "Into You",
          },
          {
            artist: "Dua Lipa",
            song_id: "7cYNQkJoyHVhP8Drb2n6d5",
            title: "Don't Start Now",
          },
        ]);
      } catch (error) {
        console.error("Error fetching analysis data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = await fetchSpotifyToken();
        for (let i = 0; i < similarSongs.length; i++) {
          if (similarSongs[i]) {
            const trackId = similarSongs[i].song_id;
            console.log("trackId:", trackId);
            const trackInfoResponse = await axios.get(
              `https://api.spotify.com/v1/tracks/${trackId}`,
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              }
            );

            const trackInfo = trackInfoResponse.data;
            console.log(trackInfo);
            const img_url = trackInfo.album.images[0].url;
            const preview_url = trackInfo.preview_url;

            setCoverImg((prevCoverImg) => [...prevCoverImg, img_url]);
            setPlay((prevPlay) => [...prevPlay, preview_url]);

            console.log("coverImg:", coverImg);
            console.log("play:", play);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching track data:", error);
      }
    };

    fetchData();
  }, []);

  //음원 듣기
  const handlePlayPause = async (e, track, play) => {
    if (play === null) {
      alert("미리듣기가 지원되지 않는 노래입니다");
    } else {
      try {
        const access_token = await fetchSpotifyToken();
        e.preventDefault();

        if (isPlaying) {
          await fetchPlay(access_token, track, false); //stop
          console.log("stop");
          setIsPlaying((prevIsPlaying) => !prevIsPlaying);
        } else {
          await fetchPlay(access_token, track, true); //play
          setMusicIcon(track);

          console.log("play");
          setIsPlaying((prevIsPlaying) => !prevIsPlaying);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="analysis-banner">
        <p className="analysis-title">노래 취향 분석</p>

        <p className="analysis-intro">AI가 분석해주는 나의 노래 취향</p>
      </div>

      {loading ? (
        <div style={{ marginLeft: "500px", marginTop: "100px" }}>
          <MutatingDots
            className="loader"
            height="90"
            width="100"
            radius="13"
            color="#7C93C3"
            ariaLabel="loading"
          />
          <p className="load-text">
            AI가 {nickname}님 취향의 곡을 작곡하는 중이에요
          </p>
        </div>
      ) : (
        <div>
          <div className="analysis-sub-intro">
            <p className="analysis-compelete">
              AI가 {nickname}님의 노래 취향을 분석했어요!
            </p>
            <p className="analysis-compelete">비슷한 느낌의 노래 추천</p>
          </div>
          <div className="analysis-main">
            <div className="hashtags">
              {hashtags.map((tag, index) => (
                <div
                  className="hashtag"
                  key={index}
                  style={{ backgroundColor: hashtagColors[index] }}
                >
                  #{tag}
                </div>
              ))}
            </div>

            <div className="similar-songs">
              {similarSongs.map((song, index) => (
                <li className="search-list" key={index}>
                  <div className="img-box">
                    <img
                      className="image"
                      src={coverImg[index]}
                      alt={coverImg}
                      style={{ marginTop: "-22px" }}
                    />
                    <div style={{ color: "#161728", marginTop: "100px" }}>
                      {coverImg}
                    </div>
                  </div>

                  <div className="song-intro">
                    <p className="song-title">{song.title}</p>
                    <p className="artist">{song.artist}</p>
                  </div>

                  {musicIcon === song.song_id && isPlaying ? (
                    <FaCircleStop
                      onClick={(e) =>
                        handlePlayPause(e, song.song_id, play[index])
                      }
                      className="btn-play"
                      color="#7c93c3"
                      size={34}
                    />
                  ) : (
                    <FaCirclePlay
                      onClick={(e) => handlePlayPause(e, song.song_id)}
                      className="btn-play"
                      color="#7c93c3"
                      size={34}
                    />
                  )}
                </li>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

//노래 아이디 옛 : 0a4MMyCrzT0En247IhqZbD (하입보이)
// track.id:"65FftemJ1DbbZ45DUfHJXE"(omg)
export default Page4analysis;
