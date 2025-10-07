import { create } from "zustand";

export const usePusherStore = create((set) => ({
  beamsClient: null,
  setBeamsClient: (client) => set({ beamsClient: client }),
  clearBeamsClient: () => set({ beamsClient: null }),
}))
