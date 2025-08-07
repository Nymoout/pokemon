import type { Pokemon, PokemonApiResponse } from "../App"

export const responseToPokemon = (response: PokemonApiResponse): Pokemon => {
  return {
    id: response.id,
    name: response.name,
    image: response.sprites.front_default,
    types: response.types.map(t => t.type.name),
    height: response.height,
    weight: response.weight,
    isCaptured: false,
    dateAdded: new Date().toISOString()
  }
}