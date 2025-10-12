import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase_init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
 
    const logInUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const updateProfileUser = (profileInfo) =>{
        return updateProfile(auth.currentUser, profileInfo)
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    // observer --
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false);
            console.log('current useser from observer', currentUser);
        })
        return () =>{
            unsubscribe();
        }
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        logInUser,
        logOut,
        updateProfileUser,
        logInWithGoogle,
    }
    return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default AuthProvider;