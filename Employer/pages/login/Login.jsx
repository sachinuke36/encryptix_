import React,{useState, useContext} from 'react'
import './Login.css'
import {Context} from '../../../Front-End/src/Context/StoreContext';
import axios from 'axios' 
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {url, setToken, setIsLoggedIn} = useContext(Context);
   const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fname:'',
        email:'',
        password:''
    });
    const [isAccount, setIsAccount] = useState(true);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let newUrl = ""
          if(isAccount){
             newUrl = url+"/employer/login";   // newUrl = url+"/login";
          }else{
             newUrl = url+"/employer/register"
          }
          const response = await axios.post(newUrl,formData);
          console.log(response);
          if(response.data.success){
            setToken(response.data.token);
            console.log("token",response.data.token);
            localStorage.setItem("token",response.data.token);
            navigate('/home');
            setIsLoggedIn(true);
          }else{
              console.log(response.data.message);
          }

        

    }

    const handleChange = (e)=>{
        setFormData(prev =>({...prev, [e.target.name]:e.target.value}))
    }


    

  return (
    <div className='login-page'>
        <h1>Job<span>Dekho</span></h1>
      <p className='login-head'>{isAccount? "Login": "Sign Up"}</p>
      <form className='form' onSubmit={handleSubmit} >
        {!isAccount?<div className='flex-col name'>
        <label htmlFor="name">Name</label>
        <input onChange={handleChange} value={formData.fname} type="text" name="fname" required/>
        </div> : null }
      
        <div className="email flex-col">
        <label htmlFor="email">Email</label>
        <input onChange={handleChange} value={formData.email} type="email" name="email" required/>
        </div>
        <div className="password flex-col">
        <label htmlFor="password">Password</label>
        <input onChange={handleChange} value={formData.password} type="password" name="password" required/>
        </div>
        <button type='submit'>{isAccount? "Login": "Create an account"}</button>
        <hr />
        <div className="login-bottom flex">
        <p>{isAccount ? "Don't have an account ?":"Already have an account ?"}</p> <span onClick={()=>setIsAccount(prev => !prev)} className='signup'>{isAccount ? "Sign Up":"Login"}</span>
        </div>
       
      </form>
    </div>
  )
}

export default Login
