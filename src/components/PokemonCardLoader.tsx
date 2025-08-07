import { useState, useEffect } from 'react'
import { type Pokemon, type PokemonApiResponse } from '../App'
import PokemonCard from './PokemonCard'
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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid #6d6d6dff'
      }}
    >
      Who is that pokemon?
    </Card>
  )

  return <PokemonCard
    pokemon={pokemon}
    onAddPokemon={onAddPokemon}
  />
}

export default PokemonCardLoader