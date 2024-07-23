import { create } from 'zustand'

interface UserStore {
  user: string | null
  setUser: (data: string | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (data) => set({ user: data })
}))
