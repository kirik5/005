import React, { useContext, useState } from 'react'
import styles from './SingInUp.module.css'
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Authentication } from '../../App'
import { useHistory } from 'react-router-dom'
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { child, get, getDatabase, ref, set } from 'firebase/database'

const SingInUp = () => {
    const db = getDatabase()

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        showPassword: false,
    })

    const [errorText, setErrorText] = useState('')

    const disabledSingUp = !userInfo.email || !userInfo.password

    const { setFirebaseUser } = useContext(Authentication)

    const history = useHistory()

    const handleChangeUserInfo = field => e => {
        setUserInfo({ ...userInfo, [field]: e.target.value })
    }

    const handleClickShowPassword = () => {
        setUserInfo({
            ...userInfo,
            showPassword: !userInfo.showPassword,
        })
    }

    const handleMouseDownPassword = event => {
        event.preventDefault()
    }

    const handleSingUp = () => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then(userCredential => {
                const user = userCredential.user
                setFirebaseUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                })
                history.push('/')

                const db = getDatabase()
                set(ref(db, 'users/' + user.uid), {
                    id: user.uid,
                    name: user.email,
                    email: user.email,
                    registrationDate: user.metadata.creationTime,
                    lastLoginDate: user.metadata.lastSignInTime,
                    status: 'unblocked',
                    token: user.accessToken,
                })
                    .then(() => console.log('added'))
                    .catch(error => console.log(error))
            })
            .catch(error => {
                const errorMessage = error.message
                console.log(errorMessage)

                signInWithEmailAndPassword(
                    auth,
                    userInfo.email,
                    userInfo.password
                )
                    .then(userCredential => {
                        const user = userCredential.user
                        const dbRef = ref(db)
                        get(child(dbRef, `users/`)).then(snapshot => {
                            const data = snapshot.val()
                            const keys = Object.keys(data)
                            const newUserList = []
                            for (let key of keys) {
                                newUserList.push(data[key])
                            }
                            console.log(newUserList)
                            console.log(user.uid)
                            if (
                                newUserList.find(elem => elem.id === user.uid)
                                    .status === 'deleted'
                            ) {
                                set(ref(db, 'users/' + user.uid), {
                                    id: user.uid,
                                    name: user.email,
                                    email: user.email,
                                    registrationDate:
                                        user.metadata.creationTime,
                                    lastLoginDate: user.metadata.lastSignInTime,
                                    status: 'unblocked',
                                    token: user.accessToken,
                                })
                                    .then(() => {
                                        console.log('added')
                                        setFirebaseUser({
                                            email: user.email,
                                            id: user.uid,
                                            token: user.accessToken,
                                        })
                                        history.push('/')
                                    })
                                    .catch(error => console.log(error))
                            } else {
                                setErrorText('Этот email уже используется!!!')
                            }
                        })
                    })
                    .catch(error => {
                        const errorMessage = error.message
                        console.log(errorMessage)
                    })
            })
    }

    const handleSingIn = () => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then(userCredential => {
                const user = userCredential.user
                const dbRef = ref(db)
                get(child(dbRef, `users/`)).then(snapshot => {
                    const data = snapshot.val()
                    const keys = Object.keys(data)
                    const newUserList = []
                    for (let key of keys) {
                        newUserList.push(data[key])
                    }
                    console.log(newUserList)
                    console.log(user.uid)
                    if (
                        newUserList.find(elem => elem.id === user.uid)
                            .status === 'unblocked'
                    ) {
                        setFirebaseUser({
                            id: user.uid,
                            email: user.email,
                            token: user.accessToken,
                        })
                        history.push('/')
                    } else if (
                        newUserList.find(elem => elem.id === user.uid)
                            .status === 'blocked'
                    ) {
                        setErrorText(
                            'Пользователь с такой почтой заблокирован!!!'
                        )
                    } else {
                        setErrorText(
                            'Пользователя с такой почтой не найдено!!!'
                        )
                    }
                })
            })
            .catch(error => {
                const errorMessage = error.message
                console.log(errorMessage)
                setErrorText('Некорректный логин или пароль!!!')
            })
    }

    return (
        <div className={styles.wrapper}>
            <form
                action=""
                onSubmit={e => e.preventDefault}
                className={styles.form}
            >
                <TextField
                    id="outlined-basic"
                    label="email"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={userInfo.email}
                    onChange={handleChangeUserInfo('email')}
                    error={!!errorText}
                    helperText={errorText}
                />
                <FormControl fullWidth margin="dense" variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                        Password
                    </InputLabel>
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
                                    {userInfo.showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Button
                    variant="contained"
                    startIcon={<LoginIcon />}
                    sx={{ margin: '20px 0 10px 0' }}
                    onClick={handleSingIn}
                    disabled={disabledSingUp}
                >
                    Вход
                </Button>
                <Button
                    variant="contained"
                    startIcon={<LoginIcon />}
                    onClick={handleSingUp}
                    disabled={disabledSingUp}
                >
                    Регистрация
                </Button>
            </form>
        </div>
    )
}

export default SingInUp
