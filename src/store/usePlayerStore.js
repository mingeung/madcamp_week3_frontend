import { create } from "zustand";

const usePlayerStore = create((set) => ({
  deviceId: null,
  currentTrack: null,
  player: null,

  setDeviceId: (deviceId) => set({ deviceId: deviceId }),
  setCurrentTrack: (currentTrack) => set({ currentTrack: currentTrack }),
  setPlayer: (player) => set({ player: player }),
}));

export default usePlayerStore;
