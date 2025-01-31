export interface GameActions {
  getGameOptions: (currentlyPokemonName: string, allPokemonTypes: string[]) => string[]
  handlePokemonSelection: (currentlyPokemonName: string, choice: string) => boolean
}
