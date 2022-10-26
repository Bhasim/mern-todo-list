import axios from 'axios'
import React, { useContext } from 'react'
//import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import { Context } from './ContextFun'
import './index.css'
// import "dotenv/config"
function Signup() {
    let navigate = useNavigate()

    let{allUsers,setAllUsers,signIn,setSignIn,user,setUser,fetching} = useContext(Context)
    
 
    let handleChange = (e) => {
        setUser({...user,[e.target.name]:e.target.value})
    }
    let handleSubmit = async(e) => {
        e.preventDefault()
        
         const res=await axios.post(`${process.env.REACT_APP_URL}/addUser`,{
                email:user.email,
                password:user.password
            });
            if (res.data.success){
            console.log(res.data);
                navigate("/signin")
            }
       
        // fetching().then(result => setAllUsers(result))
        // setSignIn({
        //     email:user.email,
        //     password:user.password
        // })
     
        //   #=======================
        console.log(process.env.REACT_APP_URL);
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input value={user.name} onChange={handleChange} type="text" name='name' placeholder='This is the name' />
            <input value={user.email} onChange={handleChange} type="email" name='email' placeholder='This is the email' />
            <input value={user.password} onChange={handleChange} type="password" name='password' placeholder='This is the password' />
            <button>Sign up</button>
        </form>
    </div>
  )
}

export default Signup