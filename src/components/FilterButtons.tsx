"use client"

import {
  Box,
  ButtonGroup,
  Button,
  Badge,
  type ButtonOwnProps
} from '@mui/material'
import type { FilterType } from '../App'
import type { ReactNode } from 'react'

type FilterButtonProps = {
  currentFilter: FilterType,
  filter: FilterType,
  color: "default" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
  onFilterChange: (filter: FilterType) => void,
  badgeContent: number,
  children: ReactNode
}

const FilterButton = (props: FilterButtonProps) => {
  const { currentFilter, filter, color, onFilterChange, badgeContent, children } = props
  return (
    <Button
      color={color as ButtonOwnProps['color']}
      variant={currentFilter === filter ? 'contained' : 'outlined'}
      onClick={() => onFilterChange(filter)}
    >
      <Badge
        badgeContent={badgeContent}
        color={color}
        slotProps={{
          badge: {
            sx: {
              transform: 'scale(1) translate(30px, -15px)',
            },
          },
        }}
      >
        {children}
      </Badge>
    </Button>
  )
}

interface FilterButtonsProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  stats: {
    total: number
    captured: number
    pending: number
  }
}

export default function FilterButtons({
  currentFilter,
  onFilterChange,
  stats
}: FilterButtonsProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      mb={4}
    >
      <ButtonGroup
        variant="outlined"
        size="large"
      >
        <FilterButton
          currentFilter={currentFilter}
          filter='all'
          color='primary'
          onFilterChange={onFilterChange}
          badgeContent={stats.total}
        >
          Todos
        </FilterButton>
        <FilterButton
          currentFilter={currentFilter}
          filter='captured'
          color='success'
          onFilterChange={onFilterChange}
          badgeContent={stats.captured}
        >
          Capturados
        </FilterButton>
        <FilterButton
          currentFilter={currentFilter}
          filter='pending'
          color='warning'
          onFilterChange={onFilterChange}
          badgeContent={stats.pending}
        >
          Pendientes
        </FilterButton>
      </ButtonGroup>
    </Box>
  )
}
