import { PeopleListType } from "../people/types"

export interface IStarship {
  MGLT: string
  cargo_capacity: string
  crew: string
  length: string
  manufacturer: string
  model: string
  passengers: string
  name: string
  url: string
  pilots?: PeopleListType
}

export type StarshipsListType = IStarship[]