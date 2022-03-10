import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import authService from '../../services/authService';

const AuthWare = ({ component: Component }) => {
    const location = useLocation();
    if (!authService.getCurrentUser()) return <Navigate to='/login' state={{ from: location }} replace />
    return <Component/>;
}
 
export default AuthWare;