import { Box, Button, Container, Typography } from '@mui/material'
import { FaGithub, FaFacebook, FaInstagram } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { TiArrowRightThick } from "react-icons/ti"

export default function index() {
    return (
        <Container maxWidth="lg" sx={{ display: "grid", placeItems: 'center' }}>
            <Box sx={{ maxWidth: 550, marginTop: 8 }}>
                <img src="./Photo Gallery by GT3.jpg" width="100%" height="100%" alt="" />
            </Box>
            <Typography variant="body1" color="inherit" component="div" sx={{ flexGrow: 1, fontSize: 25 }}>
                Share Your Memories with Others
            </Typography>
            <Box sx={{ marginTop: 3 }}>
                <Button variant='contained'>
                    <Link to="/photos" style={{ color: "inherit", textDecoration: "none" }}>
                        Explore More <TiArrowRightThick />
                    </Link>
                </Button>
            </Box>
            <Box sx={{ position: "fixed", bottom: 10, display: "grid", placeItems: "center" }}>
                <Typography variant="body1" color="inherit" fontSize={20}>
                    Follow Me On
                </Typography>
                <Typography variant="body1" color="inherit" display="flex" gap={2} paddingY={1}>
                    <FaGithub style={{ fontSize: 30 }} /> <FaFacebook style={{ fontSize: 30 }} /> <FaInstagram style={{ fontSize: 30 }} />
                </Typography>
            </Box>
        </Container>
    )
}
