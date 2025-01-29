import { ref, watch, computed } from 'vue'
import { PokemonPorts } from '@/domain/ports/Pokemon'
import { GamePorts } from '@/domain/ports/Game'
import type { Pokemon } from '@/domain/models/Pokemon'

type GameEvent = 'correct' | 'incorrect' | 'timeout'

interface GameState {
  currentPokemon: Pokemon | undefined
  isCover: boolean
  options: string[]
  secondsToNextPokemon: number
  isLoading: boolean
  error: Error | null
}

const POKEMON_COUNT = 100
const TYPES_COUNT = 14
const COUNTDOWN_SECONDS = 3

const getRandomPokemonId = () => Math.floor(Math.random() * POKEMON_COUNT) + 1
const getRandomTypeId = () => Math.floor(Math.random() * TYPES_COUNT) + 1

const usePokemon = () => {
  const gameState = ref<GameState>({
    currentPokemon: undefined,
    isCover: true,
    options: [],
    secondsToNextPokemon: COUNTDOWN_SECONDS,
    isLoading: false,
    error: null,
  })

  const interval = ref<number>()

  const emitGameEvent = (event: GameEvent) => {
    console.log(`Game event: ${event}`)
  }

  const fetchNewPokemon = async () => {
    gameState.value.isLoading = true
    gameState.value.error = null

    try {
      const pokemon = await PokemonPorts.getPokemon(getRandomPokemonId())
      gameState.value.currentPokemon = pokemon
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Error desconocido')
      gameState.value.error = err
      console.error('Error fetching pokemon:', err)
      throw err
    } finally {
      gameState.value.isLoading = false
    }
  }

  const fetchAllPokemonTypes = async () => {
    gameState.value.isLoading = true
    gameState.value.error = null

    try {
      const types = await PokemonPorts.getPokemonTypes(getRandomTypeId())
      if (gameState.value.currentPokemon) {
        gameState.value.options = GamePorts.generateOptions(
          gameState.value.currentPokemon.name,
          types,
        )
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Error desconocido')
      gameState.value.error = err
      console.error('Error fetching pokemon types:', err)
      throw err
    } finally {
      gameState.value.isLoading = false
    }
  }

  const getNewPokemon = async () => {
    await fetchNewPokemon()
    await fetchAllPokemonTypes()
  }

  const resetGame = () => {
    gameState.value = {
      currentPokemon: undefined,
      isCover: true,
      options: [],
      secondsToNextPokemon: COUNTDOWN_SECONDS,
      isLoading: false,
      error: null,
    }
  }

  const setNextPokemonInterval = () => {
    clearInterval(interval.value)
    interval.value = setInterval(() => {
      gameState.value.secondsToNextPokemon--
      if (gameState.value.secondsToNextPokemon === 0) {
        clearInterval(interval.value)
        emitGameEvent('timeout')
      }
    }, 1000)
  }

  watch(
    () => gameState.value.secondsToNextPokemon,
    async (newValue) => {
      if (newValue === 0) {
        resetGame()
        await getNewPokemon()
      }
    },
  )

  const handlePokemonSelection = (pokemonName: string) => {
    if (!gameState.value.currentPokemon) return

    const currentPokemonValue = gameState.value.currentPokemon.name
    const isPokemonGuessed = GamePorts.validateGuess(currentPokemonValue, pokemonName)

    if (isPokemonGuessed) {
      gameState.value.isCover = false
      gameState.value.options = []
      setNextPokemonInterval()
      emitGameEvent('correct')
    } else {
      gameState.value.isCover = true
      gameState.value.options = gameState.value.options.filter((option) => option !== pokemonName)
      emitGameEvent('incorrect')
    }
  }

  return {
    currentPokemon: computed(() => gameState.value.currentPokemon),
    isCover: computed(() => gameState.value.isCover),
    options: computed(() => gameState.value.options),
    secondsToNextPokemon: computed(() => gameState.value.secondsToNextPokemon),
    isLoading: computed(() => gameState.value.isLoading),
    error: computed(() => gameState.value.error),
    getNewPokemon,
    handlePokemonSelection,
    resetGame,
  }
}

export default usePokemon
