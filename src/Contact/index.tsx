import { Card, CardContent, Container, Grid, Typography, TextField, Box, Button } from '@mui/material'
import { MdOutlineMailOutline, MdWhatsapp } from "react-icons/md"
import { IoLogoLinkedin } from 'react-icons/io'

export default function Contact() {

    return (
        <Container maxWidth="lg" sx={{ marginTop: 20, overflow: "hidden" }}>
            <Grid container spacing={4} paddingY={1}>
                <Grid item xs={12} lg={6}>
                    <Card sx={{ minHeight: 460, maxHeight: 800 }} elevation={2}>
                        <CardContent>
                            <Typography variant="body1" color="inherit" component="p" fontSize={22} fontWeight={550} textAlign="center">
                                About Me
                            </Typography>
                            <Typography variant="body1" color="inherit" component="p" paddingTop={2} display="flex" gap={1} flexWrap="wrap">
                                <Typography variant="body1" color="inherit" component="p" sx={{ display: "flex", alignItems: "center" }}>
                                    <MdOutlineMailOutline style={{ fontSize: 20 }} />
                                </Typography>
                                <Typography variant="body1" color="inherit" component="p" sx={{ display: "flex", alignItems: "center" }} fontSize={{ xs: 18, sm: 20 }} fontWeight={550}>
                                    Email:-
                                </Typography>
                                <Typography variant="body1" color="inherit" component="p" sx={{ display: "flex", alignItems: "center" }}>
                                    shreyanshawadhiya@gmail.com
                                </Typography>
                            </Typography>
                            <Typography variant="body1" color="inherit" component="p" paddingTop={2} display="flex" gap={1} flexWrap="wrap">
                                <Typography variant="body1" color="inherit" component="p" sx={{ display: "flex", alignItems: "center" }}>
                                    <MdWhatsapp style={{ fontSize: 20 }} />
                                </Typography>
                                <Typography variant="body1" color="inherit" component="p" sx={{ display: "flex", alignItems: "center" }} fontSize={{ xs: 18, sm: 20 }} fontWeight={550}>
                                    What's App:-
                                </Typography>
                                <Typography variant="body1" color="inherit" component="p" sx={{ display: "flex", alignItems: "center" }}>
                                    9294512259
                                </Typography>
                            </Typography>
                            <Typography variant="body1" color="inherit" component="p" paddingTop={2} display="flex" gap={1} flexWrap="wrap">
                                <Typography variant="body1" color="inherit" component="p" sx={{ display: "flex", alignItems: "center" }}>
                                    <IoLogoLinkedin style={{ fontSize: 20 }} />
                                </Typography>
                                <Typography variant="body1" color="inherit" component="p" sx={{ display: "flex", alignItems: "center" }} fontSize={{ xs: 18, sm: 20 }} fontWeight={550}>
                                    Linkedin :-
                                </Typography>
                                <Typography variant="body1" color="inherit" component="p" sx={{ display: "flex", alignItems: "center" }}>
                                </Typography>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Card sx={{ maxHeight: 800 }} elevation={2}>
                        <CardContent>
                            <Typography variant="body1" color="inherit" component="p" fontSize={22} fontWeight={550} textAlign="center">
                                Contact Me
                            </Typography>
                            <Box component="form" sx={{ display: "grid", gap: 2, mt: 2 }}>
                                <TextField
                                    type='text'
                                    id=""
                                    label="Name"
                                    variant='filled'
                                />
                                <TextField
                                    type='email'
                                    id=""
                                    label="Email"
                                    required
                                    variant='filled'
                                />
                                <TextField
                                    type='text'
                                    id=""
                                    label="Your Message"
                                    variant='filled'
                                    multiline
                                    rows={6}
                                />
                                <Button variant='contained' color='primary'>Send</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
