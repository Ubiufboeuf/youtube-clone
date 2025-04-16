import { create } from 'zustand'

type SearchParams = {
  videoId: string,
  updateVideoId: (id: string) => void
}

export const useSearchParamsStore = create<SearchParams>((set) => ({
  videoId: '',
  updateVideoId: (newId) => set({ videoId: newId })
}))
