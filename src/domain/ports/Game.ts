const generateOptions = (correct: string, available: string[]): string[] => {
  const options = [correct]
  const shuffledAvailable = available
    .filter((name) => name.toLowerCase() !== correct.toLowerCase())
    .sort(() => Math.random() - 0.5)

  return [...options, ...shuffledAvailable.slice(0, 3)].sort(() => Math.random() - 0.5)
}

const validateGuess = (correct: string, guess: string): boolean => {
  return correct.toLowerCase() === guess.toLowerCase()
}

export const GamePorts = {
  generateOptions,
  validateGuess,
}
