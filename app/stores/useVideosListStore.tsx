import type { Video } from '@/env'
import { create } from 'zustand'

type VideosListStore = {
  videosList: Video[] | []
  updateVideosList: (newList: Video[]) => void
}

export const useVideosListStore = create<VideosListStore>((set) => ({
  videosList: [],
  updateVideosList: (newList) => set({ videosList: newList })
}))
