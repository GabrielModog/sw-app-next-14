import { create } from 'zustand'
import { PeopleListType } from '../types'

interface PeopleStore {
  people: PeopleListType
  setPeople: (data: PeopleListType) => void
  page: number
  setPage: (page: number) => void
}

export const usePeopleStore = create<PeopleStore>((set) => ({
  people: [],
  page: 1,
  setPeople: (data) => set({ people: data }),
  setPage: (page) => set({ page })
}))
