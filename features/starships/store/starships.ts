import { create } from 'zustand'
import { StarshipsListType } from '../types'

interface StarshipsStore {
  searchMode: boolean
  setSearchMode: (mode: boolean) => void
  starships: StarshipsListType
  setStarships: (data: StarshipsListType) => void
  page: number
  setPage: (page: number) => void
}

export const useStarshipsStore = create<StarshipsStore>((set) => ({
  starships: [],
  page: 1,
  searchMode: false,
  setSearchMode: (mode) => set({ searchMode: mode }),
  setStarships: (data) => set({ starships: data }),
  setPage: (page) => set({ page })
}))
