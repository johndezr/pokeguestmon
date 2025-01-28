export type Pokemon = {
  id: number
  name: string
  image: string
  type: number
}

export interface PokemonActions {
  getPokemon: (id: number) => Promise<Pokemon>
  getPokemonTypes: (type: number) => Promise<string[]>
}
