import React, { useEffect } from 'react'
import { rows } from '../mockUsers'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import EnhancedTableToolbar from '../tableToolbar/TableToolbar'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import EnhancedTableHead from '../tableHead/TableHead'
import TableBody from '@mui/material/TableBody'
import { getComparator, stableSort } from '../sortFunction'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import TablePagination from '@mui/material/TablePagination'
import { getDatabase, onValue, ref } from 'firebase/database'

const EnhancedTable = () => {
    const [users, setUsers] = React.useState(rows)
    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('calories')
    const [selected, setSelected] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    useEffect(() => {
        const db = getDatabase()
        const dbRef = ref(db, 'users/')
        onValue(dbRef, snapshot => {
            const data = snapshot.val()
            const keys = Object.keys(data)
            const newUserList = []
            for (let key of keys) {
                newUserList.push(data[key])
            }
            setUsers(newUserList.filter(user => user.status !== 'deleted'))
        })
        return () => {
            onValue(dbRef, snapshot => {})
        }
    }, [])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = users.map(n => n.id)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            )
        }

        setSelected(newSelected)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const isSelected = name => selected.indexOf(name) !== -1

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ maxWidth: 1200, mb: 2, margin: '0 auto' }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    selected={selected}
                    setSelected={setSelected}
                    users={users}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={users.length}
                        />
                        <TableBody>
                            {stableSort(users, getComparator(order, orderBy))
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((user, index) => {
                                    const isItemSelected = isSelected(user.id)
                                    const labelId = `enhanced-table-checkbox-${index}`

                                    return (
                                        <TableRow
                                            hover
                                            onClick={event =>
                                                handleClick(event, user.id)
                                            }
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={user.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby':
                                                            labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={user.id}
                                                scope="row"
                                                padding="none"
                                                align="right"
                                            >
                                                {user.id}
                                            </TableCell>
                                            <TableCell align="left">
                                                {user.name}
                                            </TableCell>
                                            <TableCell align="left">
                                                {user.email}
                                            </TableCell>
                                            <TableCell align="right">
                                                {user.registrationDate}
                                            </TableCell>
                                            <TableCell align="right">
                                                {user.lastLoginDate}
                                            </TableCell>
                                            <TableCell align="left">
                                                {user.status}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={'Пользователей на странице'}
                    labelDisplayedRows={function defaultLabelDisplayedRows({
                        from,
                        to,
                        count,
                    }) {
                        return `${from}–${to} из ${
                            count !== -1 ? count : `more than ${to}`
                        }`
                    }}
                />
            </Paper>
        </Box>
    )
}

export default EnhancedTable
