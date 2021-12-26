import React, { useContext } from 'react'
import { Authentication } from '../../App'
import { Redirect } from 'react-router-dom'
import EnhancedTable from './enhancedTable/EngancedTable'

const Users = () => {
    const { firebaseUser } = useContext(Authentication)

    return (
        <>
            {firebaseUser.id ? (
                <EnhancedTable />
            ) : (
                <Redirect to={'/singInUp'} />
            )}
        </>
    )
}

export default Users
