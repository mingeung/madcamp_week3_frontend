import { create } from "zustand";

const usePlayerStore = create((set) => ({
  deviceId: null,
  currentTrack: null,
  player: null,
  position: null,
  duration: null,

  setDeviceId: (deviceId) => set({ deviceId: deviceId }),
  setCurrentTrack: (currentTrack) => set({ currentTrack: currentTrack }),
  setPlayer: (player) => set({ player: player }),
  setPosition: (position) => set({ position: position }),
  setDuration: (duration) => set({ duration: duration }),
}));

export default usePlayerStore;
