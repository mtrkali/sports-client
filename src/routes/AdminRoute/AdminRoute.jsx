import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useUserRole from '../../Hooks/useUserRole';
import Loading from '../../Shared/Loading/Loading';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const {role, roleLoading} = useUserRole();

    if(loading || roleLoading){
        return <Loading></Loading>
    }
    if(!user || role !== 'admin'){
        return <Navigate state={{from : location.pathname}} to='/dashboard/forbidden'></Navigate>
    }

    return children ;
};

export default AdminRoute;