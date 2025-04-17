import type { Video } from '@/env'
import { create } from 'zustand'

type VideoStore = {
  videoInfo: Video | undefined
  updateVideoInfo: (newInfo: Video) => void
}

export const useVideoInfoStore = create<VideoStore>((set) => ({
  videoInfo: undefined,
  updateVideoInfo: (newVideoInfo) => set({ videoInfo: newVideoInfo })
}))
