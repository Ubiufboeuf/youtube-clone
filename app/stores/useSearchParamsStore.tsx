import { create } from 'zustand'

type searchParams = {
  videoId: string,
  updateVideoId: (id: string) => void
}

export const useSearchParamsStore = create<searchParams>((set) => ({
  videoId: '',
  updateVideoId: (newId) => set({ videoId: newId })
}))
