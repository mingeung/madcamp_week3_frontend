import React, { useEffect } from "react";
import Soundfont from "soundfont-player";
import * as Tone from "tone";

class MakeSound extends React.Component {
  // Web Audio API의 AudioContext 생성
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Soundfont 라이브러리를 사용하여 특정 악기("acoustic_grand_piano")의 소리 로드
  player = new Soundfont.Player(this.audioContext);

  // 메서드에서 비동기 코드를 처리
  playSound = async (musicalChords) => {
    await this.player.load("acoustic_grand_piano");

    musicalChords.forEach((chordNote, index) => {
      this.player.play(
        `${chordNote}/4`,
        this.audioContext.currentTime + index * 0.5,
        {
          duration: 0.5,
        }
      );
    });
  };

  render() {
    return <div>MakeSound Component</div>;
  }
}

export default MakeSound;
