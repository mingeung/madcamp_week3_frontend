import instance from "../axiosConfig.js";
const userMusicSave = async (track) => {
  let now = new Date().toISOString().slice(0, -1); // 'Z' 제거

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

export default userMusicSave;
