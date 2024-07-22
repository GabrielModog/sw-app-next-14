import { create } from 'zustand'
import { IStarship } from '../types'

interface UseShipStore {
  ship: IStarship | null
  setShip: (data: IStarship) => void
}

export const useShipStore = create<UseShipStore>((set) => ({
  ship: null,
  setShip: (ship) => set({ ship }),
}))
