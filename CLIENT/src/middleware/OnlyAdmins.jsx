import React from 'react'
import { isAllowAdminsOnly } from '../utils/checkRole'
import { useUser } from '../context/UserContext'
import { Navigate } from 'react-router-dom'

const OnlyAdmins = ({ children }) => {
    const { currentUser } = useUser()
    if (!isAllowAdminsOnly(currentUser)) return <Navigate to='/dashboard' />
    return children
}

export default OnlyAdmins