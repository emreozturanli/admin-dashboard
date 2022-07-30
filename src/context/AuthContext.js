import { createContext, useState, useEffect} from "react";
import { auth} from '../firebase/firebase';
import {  signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import toast from 'react-hot-toast';


export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');

    // when the page is opened, setting user to the currentusers info
    useEffect(() => {
        currentUser(setUser)
    }, [])

    //resetting input fields after register
    const resetInputs = () => {
        setEmail('')
        setPassword('')
    }
  
  //logging in a user with firebase with email and password
  const login = async (e,navigate) => {
    e.preventDefault()
    try {
      const {user} = await signInWithEmailAndPassword(auth, email, password)
      toast.success('user succesfully logged in')
      console.log(user)
        navigate("/dashboard")
        resetInputs();
    } catch (err) {
      toast.error(err.message)
    }
  }
  
  //logging out the user 
const logout = async (navigate) => {
    try {
      await signOut(auth)
      toast.success('Logged out succesfully')
      navigate("/")
    } catch (err) {
      toast.error(err.message)
    }
  }
  
  const currentUser = (setUser)=>{
    try{
      onAuthStateChanged(auth,(user)=>{
        if(user){
          console.log(user);
          setUser(user)
        
        }else{
          setUser('')
        }
      })
    }catch(err){
      toast.error(err.message)
    }
  }

  const resetPassword = async (e,navigate)=>{
    e.preventDefault()
    try{
      await sendPasswordResetEmail(auth,email)
      navigate('/')
      toast.success('New password is sent to your email!!!')
      setEmail('')
      
    }catch(err){
      toast.error(err)
    }
  }

return (
        <AuthContext.Provider value={{
            logout,
            email, 
            password, 
            setEmail, 
            setPassword, 
            login, 
            user,
            resetPassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider