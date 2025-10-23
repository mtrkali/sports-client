import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import Swal from 'sweetalert2';

const GoogleSignIn = ({from}) => {
    const {logInWithGoogle} = useAuth();
    const navigate = useNavigate();
    const axiosInstance = useAxiosInstance();

    const handleGoogleSignIn = () =>{
        logInWithGoogle()
        .then(async(result)=>{
            const user = result.user;
            
            const userInfo = {
                name:user?.displayName,
                email: user.email,
                role: 'user',
                last_signIn: new Date().toISOString(),
                createdAt: new Date().toISOString(),
            }

            const res = await axiosInstance.post('/users/google', userInfo)
            if(res.data.upsertedId){
                Swal.fire('Success','user successfully created!!','success')   
            }else if (res.data.modifiedCount){
                Swal.fire('Success', 'Welcome back Last signIn updated', 'success')
            }else{
                Swal.fire('Info','no change made info','info')
            }
            navigate(from);
        })
        .catch(err =>{
            console.error('error in google sign In ', err);
        })
    }
    return (
        <div className='text-center'>
            <p className="mb-4 text-black mt-5">OR</p>
            {/* Google */}
            <button onClick={handleGoogleSignIn} className="btn border border-amber-500 bg-white w-full text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
        </div>
    );
};

export default GoogleSignIn;