import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useContext } from 'react'
import { Authentication } from '../../../App'

export default function ButtonAppBar() {
    const { firebaseUser, setFirebaseUser } = useContext(Authentication)

    const handleLogout = () => {
        setFirebaseUser({
            email: null,
            id: null,
            token: null,
        })
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        5-е задание
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout {firebaseUser?.email}
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
