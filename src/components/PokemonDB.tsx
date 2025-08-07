import { Button, Card, Typography } from "@mui/material"
import { useEffect, useState, useCallback, useMemo } from "react"
import type { Pokemon } from "../App"
import PokemonCardLoader from "./PokemonCardLoader"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PokemonsContainer } from "./PokemonsContainer";

type Props = {
    pokemonIds: Set<number>
    onAddPokemon: (pokemon: Pokemon) => void
    onError: (message: string) => void
}

const PAGE_SIZE = 20
const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon'
type PageDirection = 'ASC' | 'DESC' | 'REFRESH'

export const PokemonDB = (props: Props) => {
    const { pokemonIds, onAddPokemon, onError } = props

    const [page, setPage] = useState<string[]>([])
    const [minId, setMinId] = useState<number>(0)
    const [maxId, setMaxId] = useState<number>(0)

    const setCurrentPage = useCallback((direction: PageDirection = 'ASC') => {
        const newPageSet = new Set<number>()
        let id = 0
        switch (direction) {
            case 'ASC':
                id = maxId + 1
                break
            case 'DESC':
                id = minId - 1
                break
            case 'REFRESH':
                id = minId
                break
        }
        while (newPageSet.size != PAGE_SIZE) {
            if (id === 0) {
                id = 1
                direction = 'ASC'
                continue
            }
            if (!pokemonIds.has(id)) {
                newPageSet.add(id)
            }
            id = direction == 'ASC' || direction == 'REFRESH' ? id + 1 : id - 1
        }

        const newPage = [...newPageSet]
        newPage.sort((id1, id2) => id1 - id2)
        setMinId(newPage[0])
        setMaxId(newPage[newPage.length - 1])
        setPage(newPage.map(id => `${POKEMON_URL}/${id}`))
    }, [pokemonIds, minId, maxId, setPage])

    useEffect(() => {
        const loaded = Boolean(localStorage.getItem('pokemonsLoaded'))
        if (!loaded) return
        setCurrentPage('REFRESH')
    }, [setCurrentPage])

    const minContiguousId = useMemo(() => {
        const ids = new Set(pokemonIds)
        let i = 1
        while (ids.has(i)) {
            i++
        }
        return i
    }, [pokemonIds])

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                pt: 4,
                borderRadius: 5
            }}
        >
            <Typography
                variant='h3'
                component='h1'
                gutterBottom color='primary'
                textAlign='center'
            >
                Base de Datos Pokémon
            </Typography>
            <PokemonsContainer>
                <div style={{
                    display: 'flex',
                    paddingLeft: '64px',
                    paddingRight: '64px',
                    width: '100%',
                    justifyContent: 'space-between',
                }}>
                    <Button
                        variant='outlined'
                        sx={{ marginRight: 2 }}
                        disabled={minContiguousId == minId}
                        onClick={() => {
                            setCurrentPage('DESC')
                        }}
                    >
                        <ArrowBackIcon />
                        Anterior
                    </Button>
                    <Button
                        variant='outlined'
                        onClick={() => {
                            setCurrentPage('ASC')
                        }}
                    >
                        Siguiente
                        <ArrowForwardIcon />
                    </Button>
                </div>
                {page.map((url, index) => (
                    <PokemonCardLoader
                        key={index}
                        url={url}
                        onAddPokemon={(pokemon) => {
                            page.splice(index, 1)
                            setPage([...page])
                            onAddPokemon(pokemon)
                        }}
                        onError={onError}
                    />
                ))}
            </PokemonsContainer>
        </Card >
    )
}
