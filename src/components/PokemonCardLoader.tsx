import { useState, useEffect } from 'react'
import { type Pokemon, type PokemonApiResponse } from '../App'
import PokemonCard from './PokemonCard'
import pokemonImage from '../../public/who_is_that_pokemon.webp'
import axios from 'axios'
import { Card } from '@mui/material'
import { responseToPokemon } from './responseToPokemon'

type Props = {
  url: string,
  onAddPokemon: (pokemon: Pokemon) => void,
  onError: (msg: string) => void
}

const PokemonCardLoader = (props: Props) => {
  const { url, onAddPokemon, onError } = props
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get<PokemonApiResponse>(url)
        setPokemon(responseToPokemon(response.data))
      } catch {
        onError('Error al cargar el pokemon')
      }
    }
    fetchPokemon()
  }, [url, onError])

  if (!pokemon) return (
    <Card
      elevation={2}
      sx={{
        display: 'flex',
        width: 300,
        height: 362,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #6d6d6dff'
      }}
    >
      <img
        src={pokemonImage}
        style={{
          width: '100%', height: '100%',
          boxShadow: '0 0 25px 5px rgba(67, 67, 67, 0.1)'
        }}
      />
    </Card>
  )

  return <PokemonCard
    pokemon={pokemon}
    onAddPokemon={onAddPokemon}
  />
}

export default PokemonCardLoader