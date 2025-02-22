import instance from "../axiosConfig.js";
//music과 관련된 api는 여기에 모아두기^^(많이 호출하는 친구들...)

export const userMusicSave = async (track) => {
  let now = new Date().toISOString().slice(0, -1);

  try {
    const postDate = {
      trackId: track.id,
      artistName: track.artists[0].name,
      trackName: track.name,
      date: now,
    };
    await instance.post("/playing", postDate);
    console.log("사용자 노래 기록 저장");
  } catch (e) {
    console.log("사용자 노래 기록 저장 오류 발생:", e);
  }
};
