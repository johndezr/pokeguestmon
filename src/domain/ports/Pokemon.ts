import { PokemonService } from '@/services/Pokemon'

export const PokemonPorts = {
  getPokemon: (id: number) => PokemonService.getPokemon(id),
  getPokemonTypes: (type: number) => PokemonService.getPokemonTypes(type),
}
