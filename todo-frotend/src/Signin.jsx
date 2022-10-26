import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import { Context } from './ContextFun'
import './index.css'

function Signin() {
    let navigate = useNavigate()
    let{allUsers,setAllUsers,signIn,setSignIn,user,setUser,fetching} = useContext(Context)
   
   
      let handleChange = (e) => {
        setSignIn({...signIn,[e.target.name]:e.target.value})
      }
      let handleSubmit = (e) => {
        e.preventDefault()
        if(allUsers.some(item => item.email === signIn.email && item.password === signIn.password)){
            navigate("/todos")
        }else{
            alert("E-Mail or Passowrd is not correct !")
        }
       

      }
      useEffect(()=>{
        setTimeout(()=>{
          fetching().then(result => setAllUsers(result))
        },1000)
      },[])

     
      
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" id="" onChange={handleChange} value={signIn.email} />
            <input type="password" name="password" id="" onChange={handleChange} value={signIn.password}/>
            <button>Sign in</button>
        </form>
    </div>
  )
}

export default Signin