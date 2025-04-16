import type { Location } from 'react-router'
import { create } from 'zustand'

type LocationStore = {
  location: Location | undefined
  updateLocation: (newValue: Location) => void
}

export const useLocationStore = create<LocationStore>((set) => ({
  location: undefined,
  updateLocation: (newValue) => set({ location: newValue }) 
}))
