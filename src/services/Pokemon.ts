import type { Pokemon, PokemonActions } from '@/domain/models/Pokemon'
import enhancedFetch from '@/libs/enhacedFetch'

interface PokemonApiResponse extends Omit<Pokemon, 'image'> {
  sprites: {
    other: {
      dream_world: {
        front_default: string
      }
    }
  }
  types: {
    slot: number
  }[]
}

interface PokemonTypeApiResponse {
  pokemon: {
    pokemon: {
      name: string
    }
  }[]
}

const getPokemon = async (pokemonId: number): Promise<Pokemon> => {
  const { id, name, sprites, types } = (await enhancedFetch(
    `pokemon/${pokemonId}`,
  )) as PokemonApiResponse
  return {
    id,
    name,
    image: sprites.other.dream_world.front_default,
    type: types[0].slot,
  }
}

const getPokemonTypes = async (pokemonType: number): Promise<string[]> => {
  const { pokemon } = (await enhancedFetch(`type/${pokemonType}`)) as PokemonTypeApiResponse
  const types = pokemon.map(({ pokemon }) => pokemon.name).slice(0, 3)
  return types
}

export const PokemonService: PokemonActions = {
  getPokemon,
  getPokemonTypes,
}
