//Page5resultComposition.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Page5resultComposition.css";
import { MutatingDots } from "react-loader-spinner";
import "./Page5resultComposition.css";
import axios from "../axiosConfig";
import * as Tone from "tone";

export default function Page5resultComposition() {
  const location = useLocation();
  const { state } = location;
  const { selectedGenre, inputTitle, inputSinger } = state || {};
  const [loading, setLoading] = useState(true);
  const nickname = "민승"; //임시 닉네임
  const [songTitle, setSongTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [chord, setChord] = useState("");
  const [image, setImage] = useState("");
  //실제 음악 듣기
  // Create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth().toDestination();

  // Play the chords C Am F G7
  const playChords = async () => {
    await Tone.start();

    const now = Tone.now();

    // Define the chords and their durations
    const chords = [
      { note: "C4", duration: "4n" },
      { note: "Am5", duration: "4n" },
      { note: "F6", duration: "4n" },
      { note: "G7", duration: "4n" },
      { note: "C4", duration: "4n" },
      { note: "Am5", duration: "4n" },
      { note: "F6", duration: "4n" },
      { note: "G7", duration: "4n" },
      { note: "C4", duration: "4n" },
      { note: "Am5", duration: "4n" },
      { note: "F6", duration: "4n" },
      { note: "G7", duration: "4n" },
    ];

    // Play each chord in sequence
    chords.forEach((chord, index) => {
      synth.triggerAttackRelease(chord.note, chord.duration, now + index * 0.5);
    });
  };
  return (
    <div className="ai-result-container">
      <div className="composition-banner">
        <p className="composition-title">작곡하기</p>
        <p className="composition-intro">
          내가 좋아하는 노래를 직접 만들어 들어요
        </p>
      </div>

      <div className="composition-main">
        <div className="blur">
          <p className="generated-by-ai">AI가 만든 곡</p>
          <div className="song-info-box">
            <img
              className="ai-result-image"
              src={"../assets/images/dance.png"}
            />

            <div>
              <div className="ai-bold-text">songTitle</div>
              <div className="ai-lyrics">{lyrics}</div>
              <div className="ai-lyrics">
                챗지피티가 제공해준 가사가 여기에 제시될 예정입니다. 여러분이
                적어준 가수와 노래, 장르를 토대로 비슷한 느낌의 노래를
                작곡해줍니다.{" "}
              </div>
            </div>
            <div>
              <p className="ai-bold-text">코드 진행</p>

              <div className="ai-chord">
                Cm G7 F Am Cm G7 F Am Cm G7 F Am Cm G7 F Am Cm G7 F Am Cm G7 F
                Am{" "}
              </div>
              <button className="btn-cords" onClick={playChords}>
                Chords 재생
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
