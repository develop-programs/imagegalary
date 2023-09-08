import * as React from 'react';
import { styled, useTheme, Theme, CSSObject, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { IoImages, IoTrashSharp, IoCall } from "react-icons/io5"
import { MdFavorite } from "react-icons/md"
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdMenu } from "react-icons/md"
import { FaHome } from 'react-icons/fa'
import { IoMdMoon } from "react-icons/io"
import { BsBrightnessHighFill } from "react-icons/bs"
import { Link } from 'react-router-dom';


// STYLED COMPONENTS


const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

// MAIN FUNCTION


export default function MiniDrawer({ children }: { children: React.ReactNode }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState<boolean>(false);
    const [Select, setSelect] = React.useState<boolean>(true)

    const Theme = createTheme({
        palette: {
            mode: Select ? "light" : "dark"
        }
    })
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={Theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} elevation={0} color='inherit'>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MdMenu />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            <Link to="/" style={{ textDecoration: 'none', color: "inherit" }}>
                                ImageGalary
                            </Link>
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: "flex", justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                            <IconButton aria-label="" onClick={() => {
                                setSelect(!Select)
                            }}>
                                {Select ? <BsBrightnessHighFill /> : <IoMdMoon />}
                            </IconButton>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <MdOutlineKeyboardArrowRight /> : <MdOutlineKeyboardArrowLeft />}
                        </IconButton>
                    </DrawerHeader>
                    <List>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <Link to="/" style={{ textDecoration: 'none', color: "inherit" }}>
                                <ListItemButton sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}>
                                    <ListItemIcon sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}>
                                        <FaHome />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <Link to="/photos" style={{ textDecoration: 'none', color: "inherit" }}>
                                <ListItemButton sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}>
                                    <ListItemIcon sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}>
                                        <IoImages />
                                    </ListItemIcon>
                                    <ListItemText primary="Photos" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <Link to="/favorites" style={{ textDecoration: 'none', color: "inherit" }}>
                                <ListItemButton sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}>
                                    <ListItemIcon sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}>
                                        <MdFavorite />
                                    </ListItemIcon>
                                    <ListItemText primary="Favorites" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <Link to="/trash" style={{ textDecoration: 'none', color: "inherit" }}>
                                <ListItemButton sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}>
                                    <ListItemIcon sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}>
                                        <IoTrashSharp />
                                    </ListItemIcon>
                                    <ListItemText primary="Trash" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <Link to="/contact" style={{ textDecoration: 'none', color: "inherit" }}>
                                <ListItemButton sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}>
                                    <ListItemIcon sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}>
                                        <IoCall />
                                    </ListItemIcon>
                                    <ListItemText primary="Contact" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, px: 1 }}>
                    <DrawerHeader />
                    {children}
                </Box>
            </Box>
        </ThemeProvider >
    );
}