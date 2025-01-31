import { PokemonService } from '@/services/Pokemon'

export const PokemonUseCases = {
  getPokemon: (id: number) => PokemonService.getPokemon(id),
  getPokemonTypes: (type: number) => PokemonService.getPokemonTypes(type),
}
