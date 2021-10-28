import { useState } from 'react';
import './App.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import initialiizeAuthentication from './firebase/firebaseinit';
initialiizeAuthentication();
function App() {
  const auth=getAuth();
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  const handleEmailChange=e=>{
    setEmail(e.target.value)
  }

  const handlePasswordChange=e=>{
    setPassword(e.target.value)
  }
   
  const handleRegistration=e=>{
    createUserWithEmailAndPassword(auth,email,password)
    .then(res=>{
      const user=res.user;
      console.log(user)
    })
     console.log(email,password);
     e.preventDefault();
  }
  return (
    <div className="mx-5">
     <form onSubmit={handleRegistration}>
       <h3 className='text-primary'>Please Register</h3>

       <div class="mb-3">
         <label for="exampleInputEmail1" class="form-label">Email address</label>
         <input onBlur={handleEmailChange} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"required/>
         <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
       </div>

       <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input onBlur={handlePasswordChange} type="password" class="form-control" id="exampleInputPassword1"required/>
       </div>

       <div class="mb-3 form-check">
           <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
           <label class="form-check-label" for="exampleCheck1">Example checkbox</label>
       </div>

       <button type="submit" class="btn btn-primary">Register</button>
       
      </form>
    </div>
  );
}

export default App;