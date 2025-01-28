import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { describe, it, vi, expect } from 'vitest'
import PokemonLayout from '@/layout/TheLayout.vue'
import { mount } from '@vue/test-utils'

const createMockUsePokemon = (overrides = {}) => ({
  currentPokemon: {
    name: 'ivysaur',
    id: 1,
    image: '',
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
})
