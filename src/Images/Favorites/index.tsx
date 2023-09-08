import Typography from '@mui/material/Typography'
import CardItems from './Card'

export default function Photos() {
    return (
        <>
            <Typography variant="body1" color="inherit" paddingY={2} fontSize={20} fontWeight={450}>
                Favorites
            </Typography>
            <CardItems />
        </>
    )
}
