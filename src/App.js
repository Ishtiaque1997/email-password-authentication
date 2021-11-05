import { useState } from 'react';
import './App.css';
import { getAuth,updateProfile, signInWithPopup,GoogleAuthProvider,sendEmailVerification,createUserWithEmailAndPassword,sendPasswordResetEmail,signInWithEmailAndPassword } from "firebase/auth";
import initialiizeAuthentication from './firebase/firebaseinit';
initialiizeAuthentication();
const googleProvider=new GoogleAuthProvider();
function App() {

  //set all the states
  const auth=getAuth();
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[error,setError]=useState('');
  const[isLogin,setIsLogin]=useState(false);
  const[name,setName]=useState('');
  
  //handle google sign in
  const handleGoogleSignIn=()=>{
   signInWithPopup(auth,googleProvider)
   .then(res=>{
     const user=res.user;
     console.log(user)
    })
  }
  
  //handle total registration
  const handleRegistration=(e)=>{
  e.preventDefault();
  console.log(email,password)
   if(password.length<6){
      setError('password must be at least 6 characters')
     return ;
   }
   if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
   setError('password must contain upper case');
   return;
   }
   isLogin?processLogin(email,password):createNewUser(email,password)
   }
  
  //verify email 
  const verifyEmail=()=>{
  sendEmailVerification(auth.currentUser)
  .then(res=>{
    console.log(res);
  })
  }

  //process login
  const processLogin=(email,password)=>{
  signInWithEmailAndPassword(auth,email,password)
  .then(res=>{
    const user=res.user;
    console.log(user);
    setError('');
  })
  .catch(error=>{
    setError(error.message)
  })
 }
 //reset password
const resetPassword=()=>{
  sendPasswordResetEmail(auth,email)
  .then(res=>{
    console.log(res);
  })
}

//toggle form
const toggleLogin=e=>{
  setIsLogin(e.target.checked);
}


const handleEmailChange=e=>{
  setEmail(e.target.value);
}

const handleNameChange=e=>{
  setName(e.target.value);
}

const handlePasswordChange=e=>{
  setPassword(e.target.value);
}

const createNewUser=(email,password)=>{
   createUserWithEmailAndPassword(auth,email,password)
   .then(res=>{
     const user=res.user;
     console.log(user);
     setError('');
     verifyEmail();
     setUserName();
   })
   .catch(error=>{
     setError(error.message)
   })
}

const setUserName=()=>{
  updateProfile(auth.currentUser,{
    displayName:name
  })
  .then(res=>{

  })
}
  
  
  return (
    <div className='mx-5'>
     <form onSubmit={handleRegistration}>
       <h3 className='text-primary'>Please {isLogin?'Login':'Register'}</h3>
{!isLogin &&
           <div className="row-mb-3">
           <label for="inputAddress" className="form-label">Name</label>
    <div className='col-sm-10'>
      
    <input type="text"onBlur={handleNameChange} className="form-control" id="inputAddress" placeholder="Your name"/>
    </div>
  </div>
}
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input onChange={handleEmailChange} type="email" className="form-control" id="inputEmail3"required/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input onChange={handlePasswordChange} type="password" className="form-control" id="inputPassword3"required/>
    </div>
  </div>
  
  <div className="row mb-3">
    <div className="col-sm-10 offset-sm-2">
      <div className="form-check">
        <input onChange={toggleLogin}className="form-check-input" type="checkbox" id="gridCheck1"/>
        <label className="form-check-label" htmlFor="gridCheck1">
          Already registered?
        </label>
      </div>
    </div>
  </div>
  <div className='row mb-3'>
    {error}
  </div>
  <button type="submit" className="btn btn-primary">{isLogin?'Login':'Register'}</button>
  <br />
  <button onClick={resetPassword}>Forget password</button>
</form>
      <br /><br /><br />
    <div>--------------</div>
    <br /><br /><br />
    <button onClick={handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
}

export default App;