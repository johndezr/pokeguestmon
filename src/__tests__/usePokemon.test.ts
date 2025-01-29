import { vi, describe, expect, it, beforeEach } from 'vitest'
import usePokemon from '../composables/usePokemon'

describe('usePokemon', () => {
  const { currentPokemon, getNewPokemon, options, isCover, handlePokemonSelection } = usePokemon()
  const defaultSvgImage =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
  const mockPokemonResponse = {
    id: 1,
    name: 'ivysaur',
    sprites: {
      other: {
        dream_world: {
          front_default: defaultSvgImage,
        },
      },
    },
    types: [
      {
        slot: 1,
      },
    ],
  }
  const mockOptionsResponse = {
    pokemon: [
      { pokemon: { name: 'ivysaur' } },
      { pokemon: { name: 'bulbasaure' } },
      { pokemon: { name: 'charmander' } },
      { pokemon: { name: 'venusaur' } },
    ],
  }

  beforeEach(async () => {
    const mockFetchResponse = (data: typeof mockOptionsResponse | typeof mockPokemonResponse) =>
      Promise.resolve({ json: () => Promise.resolve(data) } as Response)

    vi.spyOn(window, 'fetch')
      .mockImplementationOnce(() => mockFetchResponse(mockPokemonResponse))
      .mockImplementationOnce(() => mockFetchResponse(mockOptionsResponse))
    await getNewPokemon()
  })

  it('should return the correct values', () => {
    const {
      currentPokemon,
      isCover,
      options,
      secondsToNextPokemon,
      getNewPokemon,
      handlePokemonSelection,
    } = usePokemon()

    expect(currentPokemon.value).toBeUndefined()
    expect(isCover.value).toBe(true)
    expect(options.value).toEqual([])
    expect(secondsToNextPokemon.value).toBe(3)
    expect(getNewPokemon).toBeInstanceOf(Function)
    expect(handlePokemonSelection).toBeInstanceOf(Function)
  })

  it('should fetch a new pokemon and the relevant types', async () => {
    expect(currentPokemon.value).not.toBeUndefined()
    expect(options.value).toHaveLength(mockOptionsResponse.pokemon.length)
  })

  it('should handle a pokemon selection', async () => {
    handlePokemonSelection(currentPokemon.value!.name)

    expect(isCover.value).toBe(false)
    expect(options.value).toEqual([])
  })

  it('should handle a wrong pokemon selection', async () => {
    handlePokemonSelection('bulbasaure')

    expect(isCover.value).toBe(true)
    expect(options.value).toHaveLength(mockOptionsResponse.pokemon.length - 1)
  })
})
