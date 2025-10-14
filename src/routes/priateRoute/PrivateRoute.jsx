import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Loading from '../../Shared/Loading/Loading';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }

    if(!user){
        return <Navigate to= '/login' state={location.pathname}></Navigate>
    }

    return children
};

export default PrivateRoute;