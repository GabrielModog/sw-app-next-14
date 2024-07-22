import { create } from 'zustand'
import { IPeople } from '../types'

interface PersonStore {
  person: IPeople | null
  setPerson: (data: IPeople) => void
  url: string | null
  setUrl: (url: string) => void
}

export const usePersonStore = create<PersonStore>((set) => ({
  person: null,
  url: null,
  setPerson: (data: IPeople) => set({ person: data }),
  setUrl: (url) => set({ url })
}))
