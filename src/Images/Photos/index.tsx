import Typography from '@mui/material/Typography'
import CardItems from './Card'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../services/Redux/Store'
import { fetchProduct } from '../../services/Redux/Reducers/Photos'
import FloatingActionButton from '../../components/Ui/FloatingActionButton'

export default function Photos() {
    const dispatch = useDispatch<AppDispatch>()
    React.useEffect(() => {
        dispatch(fetchProduct())
    }, [])
    return (
        <>
            <Typography variant="body1" color="inherit" paddingY={2} fontSize={20} fontWeight={450}>
                Photos
            </Typography>
            <CardItems />
            <FloatingActionButton />
        </>
    )
}
