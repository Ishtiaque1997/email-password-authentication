import { useState } from 'react';
import './App.css';
import { getAuth, signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import initialiizeAuthentication from './firebase/firebaseinit';
initialiizeAuthentication();
const googleProvider=new GoogleAuthProvider();
function App() {

  const auth=getAuth();
  const handleGoogleSignIn=()=>{
   signInWithPopup(auth,googleProvider)
   .then(res=>{
     const user=res.user;
    })

  }
  
 const handleRegistration=(e)=>{
   e.preventDefault();

 }

  
  
  return (
    <div className='App'>
      <form onSubmit={handleRegistration}>
        <h3>Please register</h3>
        <label htmlFor='email'>Email</label>
        <input type="text"name='email' />
        <br/>
        <label htmlFor='password'>Password</label>
        <input type="Password"name='password' />
        <br />
        <input type="submit"value='Register' />
      </form>
      <br /><br /><br />
    <div>--------------</div>
    <br /><br /><br />
    <button onClick={handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
}

export default App;