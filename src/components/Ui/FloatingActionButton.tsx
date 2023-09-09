import { Box, Dialog, DialogContent, Fab, Button, Typography, Alert, Snackbar, Input, CircularProgress } from '@mui/material'
import React from 'react'
import { IoMdAdd } from 'react-icons/io'
import { BiUpload } from "react-icons/bi"
import { MdFileUpload } from "react-icons/md"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { StorageRef } from '../../services/Firebase/firebase'
import axios from 'axios'
import { v4 as uuid4 } from "uuid"
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../services/Redux/Store'
import { fetchProduct } from '../../services/Redux/Reducers/Photos'

const metadata = {
    contentType: 'image/jpeg/png'
};


export default function FloatingActionButton() {

    const dispatch = useDispatch<AppDispatch>()

    const [open, setOpen] = React.useState(false);
    const [Image, setImage] = React.useState<any>()
    const [Preview, setPreview] = React.useState<any>("")
    const [Author, setAuthor] = React.useState<string>("")
    const [Message, setMessage] = React.useState<string>("")
    const [Progress, setProgress] = React.useState<number>(0)
    const [SuccessOpen, setSuccess] = React.useState<boolean>(false)
    const [ErrorOpen, setError] = React.useState<boolean>(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setProgress(0)
        setPreview("")
        setAuthor("")
    };

    const HanddleImage = (event: any) => {
        const file = event.target.files[0]
        setImage(file)
        const Reader = new FileReader()
        Reader.readAsDataURL(file)
        Reader.onload = () => {
            setPreview(Reader.result)
        }
    }

    const FileUpload = (File: any) => {
        const storageRef = ref(StorageRef, 'images/' + File.name);
        const uploadTask = uploadBytesResumable(storageRef, File, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    axios.post(`${import.meta.env.VITE_API_URL}/images/post`, {
                        Image: File.name,
                        URL: downloadURL,
                        id: uuid4(),
                        Author: Author
                    }).then(() => {
                        setSuccess(true)
                        setMessage("Image Uploded Successfully")
                        dispatch(fetchProduct())
                    }).catch((error) => {
                        setError(true)
                        setMessage(error)
                    })
                    setOpen(false);
                    setProgress(0)
                    setPreview("")
                    setAuthor("")

                });
            }
        );
    }

    return (
        <Box>
            <Fab
                color="primary"
                aria-label="fab_btn"
                sx={{ position: 'fixed', bottom: 70, right: 40, zIndex: 1000000 }}
                onClick={handleClickOpen}
            >
                <IoMdAdd style={{ fontSize: 25 }} />
            </Fab>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    {
                        Progress ? <>
                            <Box sx={{ minWidth: 550, minHeight: 200, display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "center", backgroundColor: "#76ff03", borderRadius: 2 }}>
                                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                    <CircularProgress variant="determinate" value={Progress} />
                                    <Box
                                        sx={{
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            component="div"
                                            color="text.secondary"
                                        >{`${Math.round(Progress)}%`}</Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body1" color="inherit">
                                    Completed
                                </Typography>
                            </Box></> : <>
                            <Box sx={{ minWidth: 550, minHeight: 200 }}>
                                <Box sx={{ minWidth: 550, minHeight: 180, display: "grid", placeItems: "center", backgroundColor: '#ffb74d', borderRadius: 2 }}>
                                    {
                                        Preview ? <>
                                            <img src={Preview} width="100%" height="100%" alt="" />
                                        </>
                                            :
                                            <>
                                                <label htmlFor="image_uploader" style={{
                                                    display: "flex", alignItems: "center", flexDirection: 'column', fontWeight
                                                        : 550
                                                }}><BiUpload style={{ fontSize: 40 }} />Select File To Upload</label>
                                                <input type="file" name="" hidden id="image_uploader" onChange={HanddleImage} />
                                            </>
                                    }
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <Input
                                        placeholder='Author'
                                        onChange={(Event: React.ChangeEvent<HTMLInputElement>) => {
                                            setAuthor(Event.target.value)
                                        }}
                                        fullWidth
                                        autoComplete='true'
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                                <Button variant="contained" color="warning" sx={{ gap: 1, mt: 1, mx: "auto" }} onClick={() => { FileUpload(Image) }}>
                                    <MdFileUpload style={{ fontSize: 30 }} />
                                    Upload
                                </Button>
                            </Box>
                        </>
                    }


                </DialogContent>
            </Dialog>

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
        </Box >
    )
}
