import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PokemonPicture from '../components/PokemonPicture.vue'

describe('<PokemonPicture />', () => {
  const defaultProps = {
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    isCover: true,
  }
  const wrapper = mount(PokemonPicture, { props: defaultProps })

  it('renders properly', () => {
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.exists()).toBe(true)
  })
  it('show img with correct source and cover it', () => {
    const img = wrapper.find('img')

    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(defaultProps.image)
    expect(img.classes()).toContain('apply-filter')
  })
})
