import { useState } from 'react';
import './App.css';
import { getAuth, signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import initialiizeAuthentication from './firebase/firebaseinit';
initialiizeAuthentication();
const googleProvider=new GoogleAuthProvider();
function App() {
  const[user,setUser]=useState({})

  const auth=getAuth();
  const handleGoogleSignIn=()=>{
   signInWithPopup(auth,googleProvider)
   .then(res=>{
     const user=res.user;
     const {displayName}=res.user;
     const loggedInUser={
       name:displayName
     } 
     setUser(loggedInUser)
    })

  }
  


  
  
  return (
    <div className='App'>
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      <h3>{user.name}</h3>
    </div>
  );
}

export default App;