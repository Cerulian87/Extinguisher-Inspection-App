import { Navigate } from 'react-router-dom';
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';

// This utility is used for authentication and will redirect the user to the login page if ther authentication is ever invalid

function PrivateRoute({ children, ...rest }) {
    let {user} = useContext(AuthContext)
    return user ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;

