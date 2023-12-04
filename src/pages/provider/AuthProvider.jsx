import { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from "../../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth)

    }

    const updateUserProfile = (name, photo) =>{
        return updateProfile(auth.currentUser,{
            displayName: name, photoURL: photo
        });
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            if(currentUser){
                axios.post('https://summer-camp-school-server-beige.vercel.app/jwt', {email: currentUser.email})
                .then(data =>{
                    localStorage.setItem('access-token', data.data.token)
                    setLoading(false);
                })
            }
            else{
                localStorage.removeItem('access-token')
            }

        });
        return () =>{
            return unSubscribe();
        }
    },[])
    const authInfo ={
        user,
        loading,
        setUser,
        createUser,
        signIn,
        logOut,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;