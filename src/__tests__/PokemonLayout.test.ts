import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { describe, it, vi, expect } from 'vitest'
import PokemonLayout from '../layout/TheLayout.vue'
import { mount } from '@vue/test-utils'
import ConfettiExplosion from 'vue-confetti-explosion'

const createMockUsePokemon = (overrides = {}) => ({
  currentPokemon: {
    name: 'ivysaur',
    id: 1,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  },
  isCover: false,
  options: [],
  secondsToNextPokemon: 3,
  getNewPokemon: vi.fn(),
  handlePokemonSelection: vi.fn(),
  ...overrides,
})

const mockGetNewPokemon = vi.fn()
vi.mock('@/composables/usePokemon', () => {
  return {
    default: vi.fn(() => createMockUsePokemon({ getNewPokemon: mockGetNewPokemon })),
  }
})

describe('PokemonLayout', () => {
  it('calls getNewPokemon on mount', async () => {
    mount(PokemonLayout)

    expect(mockGetNewPokemon).toHaveBeenCalled()
  })

  it('render children components', () => {
    const wrapper = mount(PokemonLayout)

    expect(wrapper.findComponent({ name: 'PokemonPicture' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'PokemonOptions' }).exists()).toBe(true)
    expect(wrapper.findComponent(ConfettiExplosion).exists()).toBe(true)
  })

  it('render children components with correct props', () => {
    const wrapper = mount(PokemonLayout)

    const imageComponent = wrapper.findComponent({ name: 'PokemonPicture' })
    const optionsComponent = wrapper.findComponent({ name: 'PokemonOptions' })

    expect(imageComponent.props('image')).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    )
    expect(imageComponent.props('isCover')).toBe(false)
    expect(optionsComponent.props('options')).toEqual([])
  })
})
