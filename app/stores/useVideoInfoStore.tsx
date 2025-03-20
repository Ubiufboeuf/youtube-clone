import type { Video } from '@/env'
import { create } from 'zustand'

type VideoStore = {
  videoInfo: Video
  updateVideoInfo: (newInfo: Video) => void
  // updateId: (by: string) => void
  // updateDuration: (by: number) => void
  // updateTimeSeen: (by: number) => void
  // updateCreatorId: (by: string) => void
  // updateTitle: (by: string) => void
  // updateViews: (by: number) => void
  // updatePublicationDate: (by: string) => void
  // updatePosters: (by: string[]) => void
  // updateAvailableOptions: (by: string[]) => void
  // updateSelectedOption: (by: string) => void
  // updateDescription: (by: string) => void
}

export const useVideoInfoStore = create<VideoStore>((set) => ({
  videoInfo: {
    id: '',
    duration: 0,
    timeSeen: 0,
    creatorId: '',
    title: '',
    views: 0,
    publicationDate: '',
    posters: [''],
    availableOptions: [''],
    selectedOption: '',
    description: ''
  },
  updateVideoInfo: (newVideoInfo) => set({ videoInfo: newVideoInfo })
  // updateId: (updateId: string) => set({ id: updateId }),
  // updateDuration: (updateDuration: number) => set({ duration: updateDuration }),
  // updateTimeSeen: (updateTimeSeen: number) => set({ timeSeen: updateTimeSeen }),
  // updateCreatorId: (updateCreatorId: string) => set({ creatorId: updateCreatorId }),
  // updateTitle: (updateTitle: string) => set({ title: updateTitle }),
  // updateViews: (updateViews: number) => set({ views: updateViews }),
  // updatePublicationDate: (updatePublicationDate: string) => set({ publicationDate: updatePublicationDate }),
  // updatePosters: (updatePosters: string[]) => set({ posters: updatePosters }),
  // updateAvailableOptions: (updateAvailableOptions: string[]) => set({ availableOptions: updateAvailableOptions }),
  // updateSelectedOption: (updateSelectedOption: string) => set({ selectedOption: updateSelectedOption }),
  // updateDescription: (updateDescription: string) => set({ description: updateDescription })
}))
