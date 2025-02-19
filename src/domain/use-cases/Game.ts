import type { GameActions } from '../models/Game'

const getGameOptions = (currentlyPokemonName: string, allPokemonTypes: string[]): string[] => {
  const options = [currentlyPokemonName, ...allPokemonTypes]
  return options
    .map((val) => ({ val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ val }) => val)
}

const handlePokemonSelection = (currentlyPokemonName: string, choice: string): boolean => {
  return currentlyPokemonName === choice
}

export const GameUseCases: GameActions = {
  getGameOptions,
  handlePokemonSelection,
}
