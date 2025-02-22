// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import "./Page5resultComposition.css";
// import { MutatingDots } from "react-loader-spinner";
// import axios from "../axiosConfig";
// // import * as Tone from "tone";
// import Vex from "vexflow";
// import Soundfont from "soundfont-player";
// import MakeSound from "./MakeSound";
// import { useAuth } from "../AuthContext";

export default function Page5resultComposition() {
  //   const location = useLocation();
  //   const { state } = location;
  //   const { selectedGenre, inputTitle, inputSinger } = state || {};
  //   const [loading, setLoading] = useState(true);
  //   const [nickname, setNickname] = useState("");
  //   const [songTitle, setSongTitle] = useState("");
  //   const [lyrics, setLyrics] = useState("");
  //   const [chord, setChord] = useState("");
  //   const { user_id } = useAuth();
  //   // const chord =
  //   //   "제안하는 코드 진행은 다음과 같습니다 [intro] G Em7 Am7 D7 G Em7 Am7 D7 [Verse] Gmaj7 Bm7 Em7 A7 Dmaj7";
  //   const [image, setImage] = useState("");

  //   //닉네임 정보 불러오기
  //   const fetchNickData = async () => {
  //     console.log(user_id);
  //     try {
  //       const response = await axios.get("http://172.10.7.24:80/users", {
  //         params: {
  //           user_id: user_id,
  //         },
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       console.log(response.data);
  //       const userData = response.data;

  //       setNickname(userData.nickname);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchNickData();
  //   }, []);

  //   // Function to fetch lyrics and chords
  //   const fetchData = async () => {
  //     console.log(selectedGenre);
  //     console.log(inputTitle);
  //     console.log(inputSinger);
  //     try {
  //       const response = await axios.post(
  //         "http://172.10.7.24:80/generate-lyrics-and-chord",
  //         {
  //           genre: selectedGenre,
  //           favorite_song: inputTitle,
  //           favorite_artist: inputSinger,
  //         }
  //       );
  //       const { generated_title, generated_lyrics, generated_chord } =
  //         response.data;

  //       setLyrics(generated_lyrics);
  //       setChord(generated_chord);
  //       setSongTitle(generated_title);
  //     } catch (error) {
  //       console.error("에러 발생:", error);
  //     }
  //   };

  //   // Function to fetch image
  //   const fetchImage = async () => {
  //     try {
  //       const imageResponse = await axios.post(
  //         "http://172.10.7.24:80/generate-image",
  //         {
  //           genre: selectedGenre,
  //           favorite_song: inputTitle,
  //           favorite_artist: inputSinger,
  //         }
  //       );
  //       const { image_url } = imageResponse.data;

  //       setImage(image_url);
  //       console.log("img:", image_url);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("이미지 에러 발생:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData();
  //     fetchImage();
  //   }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  //   //실제 음악 듣기
  //   // const synth = new Tone.Synth().toDestination();

  //   // 코드만 잘 받아오기
  //   const playChords = async () => {
  //     await Tone.start();

  //     const chordArray = chord.split(" ");

  //     // Filter out non-musical text
  //     const musicalChords = chordArray.filter((chordNote) => {
  //       if (chordNote.match(/[ㄱ-ㅎ가-힣\[\]]/)) {
  //         return false;
  //       }

  //       return chordNote;
  //     });
  //     console.log("musicalchords:", musicalChords);

  //     // //첫글자만 남기고 뒤에 3 붙이기
  //     const modifiedChords = musicalChords.map((chord) => {
  //       const firstLetter = chord.charAt(0);
  //       return `${firstLetter}3`;
  //     });
  //     console.log("modifiedChords:", modifiedChords);

  //     // // Map each chord to a note and duration

  //     await Tone.start();

  //     const now = Tone.now();
  //     const chords = modifiedChords.map((chordNote) => {
  //       return { note: chordNote, duration: "4n" };
  //     });
  //     console.log("tone.js code:", chords);

  //     chords.forEach((chord, index) => {
  //       const time = now + index * 0.5;
  //       synth.triggerAttackRelease(chord.note, chord.duration, time);
  //     });
  //   };

  return <div></div>;
}

//     <div className="ai-result-container">
//       <div className="composition-banner">
//         <p className="composition-title">작곡하기</p>
//         <p className="composition-intro">
//           내가 좋아하는 노래를 직접 만들어 들어요
//         </p>
//       </div>
//       {loading ? (
//         <div style={{ marginLeft: "500px", marginTop: "100px" }}>
//           <MutatingDots
//             className="loader"
//             height="90"
//             width="100"
//             radius="13"
//             color="#7C93C3"
//             ariaLabel="loading"
//           />
//           <p className="load-text">
//             AI가 {nickname}님 취향의 곡을 작곡하는 중이에요
//           </p>
//         </div>
//       ) : (
//         <div
//           className="composition-main"
//           style={{ backgroundImage: `src(${image})`, zIndex: 1 }}
//         >
//           <div className="blur">
//             <p className="generated-by-ai">AI가 만든 곡</p>
//             <div className="song-info-box">
//               <img
//                 src={image}
//                 className="ai-result-image"
//                 alt="ai-result-image"
//               />
//               <div>
//                 <div className="ai-bold-text">{songTitle}</div>
//                 <div className="ai-lyrics">{lyrics}</div>
//               </div>
//               <div>
//                 <p className="ai-bold-text">코드 진행</p>
//                 <div className="ai-chord">{chord}</div>
//                 <button className="btn-cords" onClick={playChords}>
//                   Chords 재생
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
