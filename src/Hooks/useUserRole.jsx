import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const {user, loading:authLoading} = useAuth();

  const {data: role='user',isLoading: roleLoading, refetch} = useQuery({
    queryKey: ['userRole',user?.email],
    enabled:  !authLoading && !!user?.email,
    queryFn:  async()=>{
      const res = await axiosSecure.get(`/users/${user?.email}/role`)
      return res.data.role;
    }
  })
  
  return {role, roleLoading: authLoading || roleLoading, refetch}
};

export default useUserRole;