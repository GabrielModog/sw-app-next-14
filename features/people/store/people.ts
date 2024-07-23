import { create } from 'zustand'
import { PeopleListType } from '../types'

interface PeopleStore {
  searchMode: boolean
  setSearchMode: (mode: boolean) => void
  people: PeopleListType
  setPeople: (data: PeopleListType) => void
  page: number
  setPage: (page: number) => void
}

export const usePeopleStore = create<PeopleStore>((set) => ({
  searchMode: false,
  people: [],
  page: 1,
  setPeople: (data) => set({ people: data }),
  setPage: (page) => set({ page }),
  setSearchMode: (mode) => set({searchMode: mode})
}))
