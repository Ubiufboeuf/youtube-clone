import type { User } from '@/env'
import { create } from 'zustand'

type UserStore = {
  user: User | undefined,
  setUser: (newUser: User) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (newUser) => set({ user: newUser })
}))
