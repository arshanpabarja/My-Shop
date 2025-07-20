import React from 'react'
import { useLoginContext } from '../../context/LoginContext'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
    const { login} = useLoginContext() 
    return (
        <>
            { login ? <Outlet/> : <Navigate to="/login"/>}
        </>
    )
}

export default PrivateRoute