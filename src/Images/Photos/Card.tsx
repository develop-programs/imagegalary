import { Grid, CardMedia, Box, Card, CardActions, IconButton, Alert, Snackbar, Tooltip, CardContent, Typography } from '@mui/material'
import { MdOutlineFavoriteBorder, MdShare } from "react-icons/md"
import { IoTrashSharp } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { AddItem, RemoveItem } from '../../services/Redux/Reducers/Favorite'
import axios from 'axios'
import React from 'react'
import { fetchProduct } from '../../services/Redux/Reducers/Photos'
import { AppDispatch } from '../../services/Redux/Store'
import { ref, deleteObject } from "firebase/storage";
import { StorageRef } from '../../services/Firebase/firebase'
import moment from 'moment'

interface DataTypes {
    _id: string,
    Image: string
    URL: string,
    id: string,
    Author: string,
    createdAt: string,
    updatedAt: string
}

export default function CardItems() {
    const dispatch = useDispatch<AppDispatch>()
    const Data = useSelector((state: any) => state.photo.data)
    const [Message, setMessage] = React.useState<string>("")
    const [SuccessOpen, setSuccess] = React.useState<boolean>(false)
    const [ErrorOpen, setError] = React.useState<boolean>(false)
    const [InfoOpen, setInfo] = React.useState<boolean>(false)

    const DeleteFile = (params: DataTypes) => {
        const desertRef = ref(StorageRef, `images/${params.Image}`);
        deleteObject(desertRef).then(async () => {
            axios.delete(`${import.meta.env.VITE_API_URL}/images/delete/${params._id}`).then(() => {
                setSuccess(true)
                setMessage("Image Deleted Successfully")
                dispatch(fetchProduct())
                dispatch(RemoveItem(params))
            }).catch((error) => {
                setError(true)
                setMessage(error)
            })
        }).catch((error) => {
            setError(true)
            setMessage(error)
        });

    }

    return (
        <div>
            <Grid container spacing={2}>
                {Data.map((itm: any, idk: any) => (
                    <Grid item xs={12} sm={6} lg={4} xl={3} key={idk} padding={2}>
                        <Box>
                            <Card sx={{ maxWidth: 450 }} elevation={5}>
                                <CardMedia component="img" src={itm.URL} width={100} height={230} loading='lazy' />
                                <CardContent sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                                    <Typography variant="body1" color="inherit" component="div">
                                        by: {itm.Author}
                                    </Typography>
                                    <Typography variant="body1" color="inherit" component="div">
                                        {moment(itm.createdAt).format("D:MM:yyyy hh:mm a")}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ display: "flex", justifyContent: 'space-between' }}>
                                    <Box>
                                        <Tooltip title="Add To favorites">
                                            <IconButton aria-label="" onClick={() => { dispatch(AddItem(itm)), setSuccess(true), setMessage(`${itm.Image} is added to favorites`) }}>
                                                <MdOutlineFavoriteBorder style={{ color: "red" }} />
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
                                        <IconButton aria-label="" onClick={() => { DeleteFile(itm) }}>
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
