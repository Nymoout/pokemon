'use client'

import {
  Typography,
  Box,
  Card,
} from '@mui/material'
import PokemonCard from './PokemonCard'
import type { Pokemon } from '../App'
import { PokemonsContainer } from './PokemonsContainer'


interface PokemonListProps {
  pokemon: Pokemon[]
  onToggleCaptured: (id: number) => void
  onRemovePokemon: (id: number) => void
}

export default function PokemonList({
  pokemon,
  onToggleCaptured,
  onRemovePokemon
}: PokemonListProps) {
  if (pokemon.length === 0) {
    return (
      <Box textAlign='center' py={8}>
        <Typography variant='h6' color='text.secondary'>
          📝 Tu lista está vacía
        </Typography>
        <Typography variant='body2' color='text.secondary' mt={1}>
          Busca y agrega algunos Pokémon para comenzar
        </Typography>
      </Box>
    )
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        pt: 4,
        borderRadius: 5,
      }}
    >
      <Typography
        variant='h3'
        component='h1'
        gutterBottom color='primary'
      >
        📋 Mi Lista de Captura ({pokemon.length})
      </Typography>
      <PokemonsContainer
      >
        {pokemon.map((poke) => (
          <PokemonCard
            key={poke.id}
            pokemon={poke}
            onToggleCaptured={onToggleCaptured}
            onRemovePokemon={onRemovePokemon}
          />
        ))}

      </PokemonsContainer>
    </Card>

  )
}
