import React from 'react';
import useUserRole from '../../Hooks/useUserRole';
import Loading from '../../Shared/Loading/Loading';
import UserProfile from '../UserProfile/UserProfile';
import AdminProfile from '../adminProfile/adminProfile';
import Forbidden from '../../Shared/ForbiddenPage/Forbidden';
import MemberProfile from '../MemberProfile/MemberProfile';

const DashBoardHome = () => {
    const {role, roleLoading} = useUserRole();
    if(roleLoading){
        return <Loading></Loading>
    }

    if(role === 'user'){
        return <UserProfile></UserProfile>
    }else if(role === 'member'){
        return <MemberProfile></MemberProfile>
    }else if (role === 'admin'){
        return <AdminProfile></AdminProfile>
    }else{
        return <Forbidden></Forbidden>
    }
};

export default DashBoardHome;