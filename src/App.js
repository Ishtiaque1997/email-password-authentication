import { useState } from 'react';
import './App.css';
import { getAuth, signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import initialiizeAuthentication from './firebase/firebaseinit';
initialiizeAuthentication();
const googleProvider=new GoogleAuthProvider();
function App() {

  const auth=getAuth();
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  const handleGoogleSignIn=()=>{
   signInWithPopup(auth,googleProvider)
   .then(res=>{
     const user=res.user;
     console.log(user)
    })

  }
  
 const handleRegistration=(e)=>{
   e.preventDefault();
   console.log(email,password)

 }
const handleEmailChange=e=>{
  setEmail(e.target.value);
}
const handlePasswordChange=e=>{
  setPassword(e.target.value);
}
  
  
  return (
    <div className='mx-5'>
     <form onSubmit={handleRegistration}>
       <h3 className='text-primary'>Please register</h3>
  <div class="row mb-3">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input onChange={handleEmailChange} type="email" class="form-control" id="inputEmail3"required/>
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input onChange={handlePasswordChange} type="password" class="form-control" id="inputPassword3"required/>
    </div>
  </div>
  
  <div class="row mb-3">
    <div class="col-sm-10 offset-sm-2">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="gridCheck1"/>
        <label class="form-check-label" for="gridCheck1">
          Example checkbox
        </label>
      </div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Sign in</button>
</form>
      <br /><br /><br />
    <div>--------------</div>
    <br /><br /><br />
    <button onClick={handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
}

export default App;