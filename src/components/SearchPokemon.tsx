'use client'

import { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Stack
} from '@mui/material'
import { Search, Add } from '@mui/icons-material'
import axios from 'axios'
import { type Pokemon, type PokemonApiResponse } from '../App'
import { responseToPokemon } from './responseToPokemon'

interface SearchPokemonProps {
  onAddPokemon: (pokemon: Pokemon) => void
  onError: (message: string) => void
}

export default function SearchPokemon(
  { onAddPokemon, onError }: SearchPokemonProps
) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState<PokemonApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const searchPokemon = async () => {
    if (!searchTerm.trim()) {
      onError('Por favor ingresa el nombre de un Pokémon')
      return
    }

    setLoading(true)
    setError('')
    setSearchResult(null)

    try {
      const response = await axios.get<PokemonApiResponse>(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase().trim()}`
      )
      setSearchResult(response.data)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setError('Pokémon no encontrado. Verifica el nombre e intenta nuevamente.')
      } else {
        setError('Error al buscar el Pokémon. Intenta nuevamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    searchPokemon()
  }

  const handleAddPokemon = () => {
    if (searchResult) {
      onAddPokemon(responseToPokemon(searchResult))
      setSearchResult(null)
      setSearchTerm('')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            boxShadow: 'none',
            gap: '16px'
          }}
        >
          <TextField
            fullWidth
            label='Nombre del Pokémon'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='ej: pikachu, charizard, mewtwo...'
            disabled={loading}
            variant='outlined'
          />
          <Button
            type='submit'
            variant='contained'
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Search />}
            sx={{ minWidth: 120 }}
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </Button>
        </div>
      </form>

      {
        error && (
          <Alert severity='error'
            sx={{ my: 2 }}
          >
            {error}
          </Alert>
        )
      }

      {
        searchResult && (
          <Card
            sx={{
              my: 4
            }}
            elevation={2}
          >
            <CardContent>
              <Box display='flex' alignItems='center' gap={3}>
                <Box
                  component='img'
                  src={searchResult.sprites.front_default}
                  alt={searchResult.name}
                  sx={{ width: 120, height: 120 }}
                />
                <Box flex={1}>
                  <Typography variant='h5' gutterBottom sx={{ textTransform: 'capitalize' }}>
                    {searchResult.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' gutterBottom>
                    ID: #{searchResult.id}
                  </Typography>
                  <Stack direction='row' spacing={1} mb={2}>
                    {searchResult.types.map((type) => (
                      <Chip
                        key={type.type.name}
                        label={type.type.name}
                        size='small'
                        color='primary'
                        variant='outlined'
                      />
                    ))}
                  </Stack>
                  <Typography variant='body2' color='text.secondary'>
                    Altura: {searchResult.height / 10} m | Peso: {searchResult.weight / 10} kg
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                startIcon={<Add />}
                onClick={handleAddPokemon}
                fullWidth
              >
                Agregar a mi lista
              </Button>
            </CardActions>
          </Card>
        )
      }
    </>
  )
}
