import { StarshipsListType } from "../starships/types"

export interface IPeople {
  birth_year: string
  eye_color: string
  gender: string
  hair_color: string
  height: string
  mass: string
  skin_color: string
  name: string
  url: string
  starships?: string[] | StarshipsListType
}

export type PeopleListType = IPeople[]