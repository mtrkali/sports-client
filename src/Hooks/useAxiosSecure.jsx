import axios from 'axios';
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom';
const axiosSecure = axios.create({
    baseURL: 'https://sports-server-gamma.vercel.app'
})
const useAxiosSecure = () => {
    const { user, logOut } = useAuth()
    const navigate = useNavigate();
    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`
        return config;
    }, (error) => {
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(res => {
        return res
    }, error => {
        console.log('server status error in axiosSecure', error.status)
        const status = error.status;
        if (status === 403) {
            return navigate('/dashboard/forbidden')
        } else if (status == 401) {
            return logOut().then(() => {
                navigate('/login')
            }).catch(error => console.log('in axiosSecure interceptor respose',error))
        }
        return Promise.reject(error)
    })
    return axiosSecure;
};

export default useAxiosSecure;