'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  Container,
  Typography,
  Box,
  Alert,
  Snackbar,
  Paper,
  Card
} from '@mui/material'
import SearchPokemon from './components/SearchPokemon'
import FilterButtons from './components/FilterButtons'
import PokemonList from './components/PokemonList'
import { PokemonDB } from './components/PokemonDB'


export interface Pokemon {
  id: number
  name: string
  image: string
  types: string[]
  height: number
  weight: number
  isCaptured: boolean
  dateAdded: string
}

type PokemonTypeName = {
  type: {
    name: string
  }
}

export interface PokemonApiResponse {
  id: number
  name: string
  url?: string
  sprites: {
    front_default: string
  }
  types: Array<PokemonTypeName>
  height: number
  weight: number
}



export type FilterType = 'all' | 'captured' | 'pending'

export default function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [filter, setFilter] = useState<FilterType>('all')
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error' | 'warning'
  }>({
    open: false,
    message: '',
    severity: 'success'
  })

  const pokemonIds = useMemo(() => {
    return new Set(pokemonList.map(p => p.id))
  }, [pokemonList])

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedPokemon = localStorage.getItem('pokemonWishlist')
    if (savedPokemon) {
      try {
        setPokemonList(JSON.parse(savedPokemon))
        localStorage.setItem('pokemonsLoaded', 'true')
      } catch (error) {
        console.error('Error loading saved Pokemon:', error)
      }
    }
  }, [])

  // Guarda los pokemon cuando sea que cambien
  useEffect(() => {
    if (pokemonList.length > 0) {
      localStorage.setItem('pokemonWishlist', JSON.stringify(pokemonList))
    }
  }, [pokemonList])

  const showSnackbar = useCallback((message: string, severity: 'success' | 'error' | 'warning') => {
    setSnackbar({ open: true, message, severity })
  }, [setSnackbar])

  const addPokemon = useCallback((newPokemon: Pokemon) => {
    if (pokemonIds.has(newPokemon.id)) {
      showSnackbar('Este Pokémon ya está en tu lista', 'warning')
      return
    }
    setPokemonList(prev => [...prev, newPokemon])
    showSnackbar(`${newPokemon.name} añadido a tu lista!`, 'success')
  }, [pokemonIds, setPokemonList, showSnackbar])

  const toggleCaptured = useCallback((id: number) => {
    const pokemon = pokemonList.find(p => p.id === id)
    if (pokemon) {
      pokemon.isCaptured = !pokemon.isCaptured
      setPokemonList([...pokemonList])
    }
  }, [pokemonList, setPokemonList])

  const removePokemon = useCallback((id: number) => {
    setPokemonList(prev => prev.filter(pokemon => pokemon.id !== id))
    showSnackbar('Pokémon eliminado de la lista', 'success')
  }, [setPokemonList, showSnackbar])

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }, [setSnackbar])

  // Filtrar Pokémon según el filtro seleccionado
  const filteredPokemon = useMemo(() => (
    pokemonList.filter(pokemon => {
      switch (filter) {
        case 'captured':
          return pokemon.isCaptured
        case 'pending':
          return !pokemon.isCaptured
        default:
          return true
      }
    })
  ), [pokemonList, filter])

  const stats = useMemo(() => ({
    total: pokemonList.length,
    captured: pokemonList.filter(p => p.isCaptured).length,
    pending: pokemonList.filter(p => !p.isCaptured).length
  }), [pokemonList])

  return (
    <Container
      maxWidth={false}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(https://whackahack.com/foro/attachments/ciudad_eliria-1-png.2595/)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backdropFilter: 'blur(11px)',
        padding: 6,
        gap: 4
      }}
    >
      <span
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backdropFilter: 'blur(6px)',
          zIndex: -1
        }}
      />
      <Card
        sx={{
          p: 4,
          borderRadius: 5,
        }}
      >
        <Typography
          variant='h3'
          component='h1'
          gutterBottom
          color='primary'
          textAlign='center'
        >
          🎯 Mi Lista de Pokémon
        </Typography>


        <Typography
          variant='h5'
          gutterBottom
        >
          🔍 Buscar Pokémon
        </Typography>


        <SearchPokemon
          onAddPokemon={addPokemon}
          onError={(msg) => showSnackbar(msg, 'error')}
        />



        <Box
          display='flex'
          justifyContent='center'
          gap={4} mb={3}
        >
          <Box textAlign='center'>
            <Typography
              variant='h4'
              color='primary'>{stats.total}
            </Typography>
            <Typography
              variant='body2'
            >
              Total
            </Typography>
          </Box>
          <Box textAlign='center'>
            <Typography
              variant='h4'
              color='success.main'
            >
              {stats.captured}
            </Typography>
            <Typography
              variant='body2'
            >
              Capturados
            </Typography>
          </Box>
          <Box textAlign='center'>
            <Typography
              variant='h4'
              color='warning.main'
            >
              {stats.pending}
            </Typography>
            <Typography
              variant='body2'
            >
              Pendientes
            </Typography>
          </Box>
        </Box>

        <FilterButtons
          currentFilter={filter}
          onFilterChange={setFilter}
          stats={stats}
        />
      </Card>
      <PokemonList
        pokemon={filteredPokemon}
        onToggleCaptured={toggleCaptured}
        onRemovePokemon={removePokemon}
      />

      <PokemonDB
        pokemonIds={pokemonIds}
        onAddPokemon={addPokemon}
        onError={(msg) => showSnackbar(msg, 'error')}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container >
  )
}
