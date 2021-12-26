import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import TableSortLabel from '@mui/material/TableSortLabel'
import Box from '@mui/material/Box'
import { visuallyHidden } from '@mui/utils'
import React from 'react'

const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'Идентификатор',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Имя',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Почта',
    },
    {
        id: 'registrationDate',
        numeric: true,
        disablePadding: false,
        label: 'Дата регистрации',
    },
    {
        id: 'lastLoginDate',
        numeric: true,
        disablePadding: false,
        label: 'Дата последнего логина',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Статус',
    },
]

const EnhancedTableHead = props => {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props
    const createSortHandler = property => event => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc'
                                        ? 'sorted descending'
                                        : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default EnhancedTableHead
