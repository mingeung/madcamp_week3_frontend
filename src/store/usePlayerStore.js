import { create } from "zustand";

const usePlayerStore = create((set) => ({
  deviceId: null,
  currentTrack: null,
  setDeviceId: (deviceId) => set({ deviceId: deviceId }),

  setCurrentTrack: (currentTrack) => set({ currentTrack: currentTrack }),
}));

export default usePlayerStore;
