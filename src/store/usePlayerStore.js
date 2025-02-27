import { create } from "zustand";

const usePlayerStore = create((set) => ({
  deviceId: null,
  currentTrack: null,
  player: true,
  position: null,
  duration: null,
  playDifferentTrack: false,

  setDeviceId: (deviceId) => set({ deviceId: deviceId }),
  setCurrentTrack: (currentTrack) => set({ currentTrack: currentTrack }),
  setPlayer: (player) => set({ player: player }),
  setPosition: (position) => set({ position: position }),
  setDuration: (duration) => set({ duration: duration }),
  setPlayDifferentTrack: (playDifferentTrack) =>
    set({ playDifferentTrack: playDifferentTrack }),
}));

export default usePlayerStore;
