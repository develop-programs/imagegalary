import Typography from '@mui/material/Typography'
import CardItems from './Card'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../services/Redux/Store'
import { fetchProduct } from '../../services/Redux/Reducers/Photos'
import FloatingActionButton from '../../components/Ui/FloatingActionButton'
import { Box, CircularProgress } from '@mui/material'

export default function Photos() {
    const [Loading, setLoading] = React.useState(true)
    const dispatch = useDispatch<AppDispatch>()
    React.useEffect(() => {
        dispatch(fetchProduct())
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [])
    return (
        <>
            {
                Loading ? <>
                    <Loader />
                </> : <>
                    <Typography variant="body1" color="inherit" paddingY={2} fontSize={20} fontWeight={450}>
                        Photos
                    </Typography>
                    <CardItems />
                    <FloatingActionButton />
                </>
            }

        </>
    )
}

export function Loader() {
    return (
        <>
            <Box sx={{ width: "100%", height: "15vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="body1" color="inherit" display="flex" gap={2} alignItems="center" fontSize={22} fontWeight={550}>
                    Fetching Your Data Please Wait  <CircularProgress size={30} thickness={5} />
                </Typography>
            </Box>
        </>
    )
}