import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PokemonOptions from '../components/PokemonOptions.vue'

describe('<PokemonOptions />', () => {
  const defaultProps = {
    options: ['bulbasaur', 'ivysaur', 'venusaur', 'charmander'],
  }
  const wrapper = mount(PokemonOptions, { props: defaultProps })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('render all the options button', () => {
    const buttons = wrapper.findAll('button')

    defaultProps.options.forEach((option, index) => {
      expect(buttons[index].text()).toBe(option)
    })
  })
  it('emit selection with the correct value', async () => {
    const button = wrapper.find('button')

    await button.trigger('click')

    expect(wrapper.emitted('handlePokemonSelection')).toBeTruthy()
    expect(wrapper.emitted('handlePokemonSelection')![0]).toEqual(['bulbasaur'])
  })
})
