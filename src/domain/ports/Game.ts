const getGameOptions = (currentlyPokemonName: string, allPokemonTypes: string[]): string[] => {
  const options = [currentlyPokemonName, ...allPokemonTypes]
  return options
    .map((val) => ({ val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ val }) => val)
}

const isPokemonGuessed = (currentlyPokemonName: string, choice: string): boolean => {
  return currentlyPokemonName === choice
}

export const GamePorts = {
  getGameOptions,
  isPokemonGuessed,
}
