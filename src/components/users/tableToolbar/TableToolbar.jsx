import Toolbar from '@mui/material/Toolbar'
import { alpha } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import React, { useContext } from 'react'
import BlockIcon from '@mui/icons-material/Block'
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt'
import { getDatabase, ref, set } from 'firebase/database'
import { Authentication } from '../../../App'

const EnhancedTableToolbar = ({
    numSelected,
    selected,
    setSelected,
    users,
}) => {
    const db = getDatabase()

    const { firebaseUser, setFirebaseUser } = useContext(Authentication)

    const handleBlockUsers = () => {
        let saveSelected = [...selected]

        const promises = selected.map(uid => {
            const user = users.find(user => user.id === uid)
            return set(ref(db, 'users/' + uid), {
                ...user,
                status: 'blocked',
            })
                .then(() => {})
                .catch(error => console.log(error))
        })

        Promise.all(promises).then(() => {
            setSelected([])
            if (saveSelected.includes(firebaseUser.id)) {
                setFirebaseUser({
                    email: null,
                    id: null,
                    token: null,
                })
            }
        })
    }

    const handleUnBlockUsers = () => {
        const promises = selected.map(uid => {
            const user = users.find(user => user.id === uid)
            return set(ref(db, 'users/' + uid), {
                ...user,
                status: 'unblocked',
            })
                .then(() => {})
                .catch(error => console.log(error))
        })

        Promise.all(promises).then(() => {
            setSelected([])
        })
    }

    const handleDeleteUsers = () => {
        let saveSelected = [...selected]
        const promises = selected.map(uid => {
            const user = users.find(user => user.id === uid)
            return set(ref(db, 'users/' + uid), {
                ...user,
                status: 'deleted',
            })
                .then(() => {})
                .catch(error => console.log(error))
        })

        Promise.all(promises).then(() => {
            setSelected([])
            if (saveSelected.includes(firebaseUser.id)) {
                setFirebaseUser({
                    email: null,
                    id: null,
                    token: null,
                })
            }
        })
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: theme =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Пользователи
                </Typography>
            )}

            {numSelected > 0 ? (
                <>
                    <Tooltip title="Block">
                        <IconButton onClick={handleBlockUsers}>
                            <BlockIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="UnBlock">
                        <IconButton onClick={handleUnBlockUsers}>
                            <DoDisturbAltIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={handleDeleteUsers}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    )
}

export default EnhancedTableToolbar
