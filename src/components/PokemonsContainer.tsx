import { Box } from '@mui/material'

type Props = {
    children: React.ReactNode
   
}

export const PokemonsContainer = (props: Props) => {
    const { children,  } = props
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flexGrow: 1,
                gap: 4,
                bgcolor: 'background.paper',
                justifyContent: 'center',
                placeItems: 'center',
                padding: 4,
                borderRadius: 2,
                boxShadow: 1,
                width: '100%',
                height: '100%',
            }}
        >
            {children}
        </Box>
    )
}
