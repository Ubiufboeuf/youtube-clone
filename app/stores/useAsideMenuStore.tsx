import { create } from 'zustand'

type AsideMenuStore = {
  isOpen: boolean,
  setIsOpen: (newState: boolean) => void
}

export const useAsideMenuStore = create<AsideMenuStore>((state) => ({
  isOpen: false,
  setIsOpen: (newState) => {
    state({ isOpen: newState })
    localStorage.setItem('asideDefaultOpened', newState.toString())
  }
}))
