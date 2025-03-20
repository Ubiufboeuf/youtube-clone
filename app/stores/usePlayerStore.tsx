import { create } from 'zustand'

type playerStore = {
  currentTime: number | undefined
  duration: number | undefined
  paused: boolean | undefined
  updateCurrentTime: (by: number) => void
  updateDuration: (by: number) => void
  updatePaused: (by: boolean) => void
}

export const usePlayerStore = create<playerStore>((set) => ({
  currentTime: undefined,
  duration: 0,
  paused: undefined,
  updateCurrentTime: (newCurrentTime: number) => set({ currentTime: newCurrentTime }),
  updateDuration: (newDuration: number) => set({ duration: newDuration }),
  updatePaused: (newState: boolean) => set({ paused: newState })
}))
