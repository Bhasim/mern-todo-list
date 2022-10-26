import React,{createContext, useEffect, useState} from 'react'
import './index.css'
// import "dotenv/config"
export let Context = createContext()
function ContextFun(props) {
    let [allUsers,setAllUsers] = useState([])
    let [signIn,setSignIn] = useState({
        email:"",
        password:""
    })
    let [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        todos:[]
    })
    let fetching = async () => {
        let res = await fetch(`${process.env.REACT_APP_URL}/getUsers`)
        let json = await res.json()
        return json
      }
      useEffect(()=>{
        fetching().then(result => setAllUsers(result))
      },[])
  return (
    <Context.Provider value={{allUsers,setAllUsers,signIn,setSignIn,fetching,user,setUser}}>{props.children}</Context.Provider>
  )
}

export default ContextFun