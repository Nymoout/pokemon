'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Switch,
  FormControlLabel,
  IconButton,
  Box,
  Chip,
  Stack,
  Collapse,
  Button
} from '@mui/material'
import { Delete, ExpandMore, ExpandLess } from '@mui/icons-material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import type { Pokemon } from '../App'

type PokemonCardProps = {
  pokemon: Pokemon,
  onAddPokemon?: (pokemon: Pokemon) => void,
  onToggleCaptured?: (id: number) => void,
  onRemovePokemon?: (id: number) => void
}

export default function PokemonCard({
  pokemon,
  onAddPokemon,
  onToggleCaptured,
  onRemovePokemon
}: PokemonCardProps) {

  const [expanded, setExpanded] = useState(false)

  const handleToggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <Card
      elevation={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        opacity: pokemon.isCaptured ? 0.8 : 1,
        border: pokemon.isCaptured ? '2px solid #4caf50' : 'none',
        width: 300,
        transition: 'scale 500ms ease-in-out',
        '&:hover:' : {
          scale: '105%'
        },
      }}
    >
      <CardContent>
        <Box display='flex'
          alignItems='center'
          justifyContent='space-between'
          mb={2}
        >
          <Typography
            variant='h6'
            sx={{ textTransform: 'capitalize' }}
          >
            {pokemon.name}
          </Typography>
          <Typography
            variant='caption'
            color='text.secondary'
          >
            #{pokemon.id}
          </Typography>
        </Box>

        <Box
          display='flex'
          justifyContent='center'
          mb={2}
        >
          <Box
            component='img'
            src={pokemon.image}
            alt={pokemon.name}
            sx={{ width: 100, height: 100 }}
          />
        </Box>

        <Stack
          direction='row'
          spacing={1}
          mb={2}
          justifyContent='center'
        >
          {pokemon.types.map((type, index) => (
            <Chip
              key={index}
              label={type}
              size='small'
              color='primary'
              variant='outlined'
            />
          ))}
        </Stack>

        {onToggleCaptured && (
          <FormControlLabel
            control={
              <Switch
                checked={pokemon.isCaptured}
                onChange={() => onToggleCaptured(pokemon.id)}
                color='success'
              />
            }
            label={pokemon.isCaptured ? '✅ Capturado' : '⏳ Pendiente'}
            sx={{ mb: 1 }}
          />
        )}
        {onAddPokemon && (
          <Button
            onClick={() => onAddPokemon(pokemon)}
            endIcon={<AddCircleIcon
              sx={{
                color: 'primary.main'
              }}
            />}
            size='large'
            color='primary'
            fullWidth
          >
            Agregar a mi lista
          </Button>
        )}

        <Button
          onClick={handleToggleExpanded}
          endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
          size='small'
          fullWidth
        >
          {expanded ? 'Menos detalles' : 'Ver detalles'}
        </Button>

        <Collapse
          in={expanded}
          sx={{
            transition: 'max-height 0.3s ease-in-out',
            maxHeight: expanded ? '500px' : '0',
            overflow: 'auto'
          }}
        >
          <Box
            mt={2}
            p={2}
            bgcolor='grey.50'
            borderRadius={1}
          >
            <Typography
              variant='body2'
              gutterBottom
            >
              <strong>Altura:</strong> {pokemon.height / 10} m
            </Typography>
            <Typography
              variant='body2'
              gutterBottom
            >
              <strong>Peso:</strong> {pokemon.weight / 10} kg
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
            >
              <strong>Añadido:</strong>
              {new Date(pokemon.dateAdded).toLocaleDateString()}
            </Typography>
          </Box>
        </Collapse>
      </CardContent>

      {onRemovePokemon && (
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <IconButton
            onClick={() => onRemovePokemon(pokemon.id)}
            color='error'
            size='small'
          >
            <Delete />
          </IconButton>
        </CardActions>
      )}
    </Card>
  )
}
