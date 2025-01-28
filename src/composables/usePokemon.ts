import { ref, watch } from 'vue'
import { PokemonPorts } from '@/domain/ports/Pokemon'
import { GamePorts } from '@/domain/ports/Game'
import type { Pokemon } from '@/domain/models/Pokemon'

const usePokemon = () => {
  const currentPokemon = ref<Pokemon>()
  const isCover = ref(true)
  const options = ref<string[]>([])
  const secondsToNextPokemon = ref<number>(3)

  const fetchNewPokemon = async () => {
    try {
      const pokemon = await PokemonPorts.getPokemon(Math.floor(Math.random() * 100) + 1)
      currentPokemon.value = pokemon
    } catch (error) {
      console.error('error', error)
      return error
    }
  }
  const fetchAllPokemonTypes = async () => {
    const types = await PokemonPorts.getPokemonTypes(Math.floor(Math.random() * 14) + 1)
    options.value = GamePorts.getGameOptions(currentPokemon.value!.name, types)
  }

  const getNewPokemon = async () => {
    await fetchNewPokemon()
    await fetchAllPokemonTypes()
  }

  const setNextPokemonInteval = async () => {
    const interval = setInterval(async () => {
      secondsToNextPokemon.value--
      if (secondsToNextPokemon.value === 0) clearInterval(interval)
    }, 1000)
  }

  watch(secondsToNextPokemon, async (newValue) => {
    if (newValue === 0) {
      currentPokemon.value = undefined
      isCover.value = true
      await getNewPokemon()
      secondsToNextPokemon.value = 3
    }
  })

  const handlePokemonSelection = (pokemonName: string) => {
    console.log('pokemonName', pokemonName)
    const currentPokemonValue = currentPokemon.value!.name
    const isPokemonGuessed = GamePorts.isPokemonGuessed(currentPokemonValue, pokemonName)
    if (isPokemonGuessed) {
      isCover.value = false
      options.value = []
      setNextPokemonInteval()
    } else {
      options.value = options.value.filter((option) => option !== pokemonName)
    }
  }

  return {
    currentPokemon,
    isCover,
    options,
    secondsToNextPokemon,
    getNewPokemon,
    handlePokemonSelection,
  }
}

export default usePokemon
