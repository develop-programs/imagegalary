import { Grid, CardMedia, Box, Card, CardActions, IconButton, Alert, Snackbar, Tooltip, CardContent } from '@mui/material'
import { MdShare } from "react-icons/md"
import { FcLike } from "react-icons/fc"
import { IoTrashSharp } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { RemoveItem } from '../../services/Redux/Reducers/Favorite'
import axios from 'axios'
import React from 'react'
import { fetchProduct } from '../../services/Redux/Reducers/Photos'
import { AppDispatch } from '../../services/Redux/Store'

interface DataTypes {
    _id: string,
    Image: string
}

export default function CardItems() {
    const dispatch = useDispatch<AppDispatch>()
    const Data = useSelector((state: any) => state.favo.Data)
    const [Message, setMessage] = React.useState<string>("")
    const [SuccessOpen, setSuccess] = React.useState<boolean>(false)
    const [InfoOpen, setInfo] = React.useState<boolean>(false)
    const [ErrorOpen, setError] = React.useState<boolean>(false)

    const DeleteFile = async (params: DataTypes) => {
        axios.delete(`${import.meta.env.VITE_API_URL}/images/delete/${params._id}`).then(() => {
            setSuccess(true)
            setMessage("Image Deleted Successfully")
            dispatch(fetchProduct())
        }).catch((error) => {
            setError(true)
            setMessage(error)
        })
    }

    return (
        <div>
            <Grid container spacing={2}>
                {Data.map((itm: any, idk: any) => (
                    <Grid item xs={12} sm={6} lg={4} xl={3} key={idk}>
                        <Box>
                            <Card sx={{ maxWidth: 450 }} elevation={5}>
                                <CardMedia component="img" src={itm.URL} width={100} height={230} loading='lazy' />
                                <CardContent>
                                    Uploded By : {itm.Author}
                                </CardContent>
                                <CardActions sx={{ display: "flex", justifyContent: 'space-between' }}>
                                    <Box>
                                        <Tooltip title="Remove from favorite">
                                            <IconButton aria-label="" onClick={() => { dispatch(RemoveItem(itm)), setSuccess(true), setMessage(`${itm.Image} is removed from favorites`) }}>
                                                <FcLike />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Share">
                                            <IconButton aria-label="" onClick={() => {
                                                setInfo(true),
                                                    setMessage("Upcomming with Update")
                                            }}>
                                                <MdShare />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Tooltip title="Delete">
                                        <IconButton aria-label="" onClick={() => { DeleteFile(itm._id) }}>
                                            <IoTrashSharp />
                                        </IconButton>
                                    </Tooltip>
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Snackbar open={SuccessOpen} autoHideDuration={2000} onClose={() => { setSuccess(!SuccessOpen) }}>
                <Alert onClose={() => { setSuccess(!SuccessOpen) }} severity="success" >
                    {Message}
                </Alert>
            </Snackbar>
            <Snackbar open={ErrorOpen} autoHideDuration={2000} onClose={() => { setError(!ErrorOpen) }}>
                <Alert onClose={() => { setError(!ErrorOpen) }} severity="error">
                    {Message}
                </Alert>
            </Snackbar>
            <Snackbar open={InfoOpen} anchorOrigin={{ horizontal: "center", vertical: 'top' }} autoHideDuration={2000} onClose={() => { setInfo(!InfoOpen) }}>
                <Alert onClose={() => { setInfo(!InfoOpen) }} severity="info">
                    {Message}
                </Alert>
            </Snackbar>
        </div>
    )
}
