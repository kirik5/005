import React, {useState} from 'react'
import styles from './SingInUp.module.css'
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import {Visibility, VisibilityOff} from "@mui/icons-material";

const SingInUp = () => {
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        showPassword: false,
    })

    const handleChangeUserInfo = field => e => {
        setUserInfo({...userInfo, [field]: e.target.value})
    }

    const handleClickShowPassword = () => {
        setUserInfo({
            ...userInfo,
            showPassword: !userInfo.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSingIn = () => {
        console.log('sing in...')
    };

    const handleSingUp = () => {
        console.log('sing up...')
    };

    return <div className={styles.wrapper}>
        <form action="" onSubmit={e => e.preventDefault} className={styles.form}>
            <TextField id="outlined-basic" label="email" variant="outlined" fullWidth margin="dense"
                       value={userInfo.email} onChange={handleChangeUserInfo('email')}/>
            <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={userInfo.showPassword ? 'text' : 'password'}
                    value={userInfo.password}
                    onChange={handleChangeUserInfo('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {userInfo.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <Button variant="contained" startIcon={<LoginIcon/>} sx={{margin: '20px 0 10px 0'}} onClick={handleSingIn}>SingIn</Button>
            <Button variant="contained" startIcon={<LoginIcon/>} onClick={handleSingUp}>SingUp</Button>
        </form>
    </div>
}

export default SingInUp