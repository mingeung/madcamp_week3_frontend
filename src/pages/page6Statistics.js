import React from "react";
import * as Tone from "tone";

const Page6Statistics = () => {
  // Create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth().toDestination();

  // Play the chords C Am F G7
  const playChords = async () => {
    await Tone.start();

    const now = Tone.now();

    // Define the chords and their durations
    const chords = [
      { note: "C4", duration: "4n" },
      { note: "A3", duration: "4n" },
      { note: "F3", duration: "4n" },
      { note: "G3", duration: "4n" },
    ];

    // Play each chord in sequence
    chords.forEach((chord, index) => {
      synth.triggerAttackRelease(chord.note, chord.duration, now + index * 0.5);
    });
  };

  return (
    <div>
      <h1 className="container">통계 페이지 입니다.</h1>
      <button style={{ marginLeft: "500px" }} onClick={playChords}>
        Chords 재생
      </button>
    </div>
  );
};

export default Page6Statistics;
