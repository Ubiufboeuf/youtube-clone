import type { Location } from 'react-router'
import { create } from 'zustand'

type locationStore = {
  location: Location | undefined
  updateLocation: (newValue: Location) => void
}

export const useLocationStore = create<locationStore>((set) => ({
  location: undefined,
  updateLocation: (newValue) => set({ location: newValue }) 
}))
