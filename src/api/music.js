import instance from "../axiosConfig";

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
  } catch (e) {
    console.log("사용자 노래 기록 저장 오류 발생:", e);
  }
};

export const userMusicQueueSave = async (track, deviceId) => {
  const uri = track.uri;
  try {
    await instance.post(`/userQueue/${uri}/${deviceId}`);
    console.log("큐에 노래 저장");
  } catch (e) {
    console.log("큐에 노래 저장 실패");
  }
};

export const getUserMusicQueue = async (setCurrentTrack) => {
  const currentTrackQueue = null;
  try {
    const response = await instance.get("/userQueue");
    console.log("사용자 유저 큐 받아오기:", response.data);
    currentTrackQueue = response.data.currently_playing;
  } catch (err) {
    console.log("유저 큐 받아오기 실패:", err);
  }
  return currentTrackQueue;
};
