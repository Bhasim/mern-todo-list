import React,{useContext, useState} from 'react'
import './index.css'
import axios from 'axios'
import { useEffect } from 'react'
import { Context } from './ContextFun'
// import "dotenv/config"
function State() {
  let{allUsers,setAllUsers,signIn,setSignIn,fetching} = useContext(Context)
 
  let [bag, setBag] = useState([])

  let [orange, setOrange] = useState({ text: "",isChecked:false})

  // Lets find the person who signed in , in our db array
  let findSignedIn = allUsers.find(item => item.email === signIn.email)
  let [selectedUser,setSelectedUser] = useState(findSignedIn)

  let handleSubmit = (e) => {
    e.preventDefault()
    //setBag([...bag, orange])
    
    setSelectedUser({...selectedUser,todos:[...selectedUser.todos,orange]})
    axios.put(`${process.env.REACT_APP_URL}/update/${selectedUser._id}`,{...selectedUser,todos:[...selectedUser.todos,orange]})
    setOrange({ text: "", isChecked: false })
    //fetching().then(result => setAllUsers(result))
  }
  // delete function
  let handleDelete = (id) => {
    let deleteOrange = selectedUser.todos.filter((orange, idClick) => id !== idClick)
    //let find = bag.find((item,index)=> index === id)
    setSelectedUser({...selectedUser,todos:deleteOrange})
    axios.put(`${process.env.REACT_APP_URL}/update/${selectedUser._id}`,{...selectedUser,todos:deleteOrange})

  }
  // Handle done
  let handleDone = (i) => {
    //let find = selectedUser.todos.find((item,index)=> index === i)
    let DoneOrange = selectedUser.todos.map((orange, idClick) => i === idClick ? { ...orange, isChecked: !orange.isChecked } : orange)
    setSelectedUser({...selectedUser,todos:DoneOrange})
    axios.put(`${process.env.REACT_APP_URL}/update/${selectedUser._id}`,{...selectedUser,todos:DoneOrange})
  }

  useEffect(()=>{
    fetching().then(result => setAllUsers(result))
  },[])
  useEffect(()=>{
    setSelectedUser(findSignedIn)
  },[allUsers])
  return (
    <div  >
      <form className="top" onSubmit={handleSubmit} >
        <input  required type="text" value={orange.text} onChange={(e) => setOrange({...orange, text: e.target.value })} />
        <button className="add">Add</button>
      </form>
      <ul>
        {
          selectedUser?.todos?.map((orange, idOrange) => (
            <li className={orange.isChecked ? "red" : "black"} key={idOrange}>{ orange?.text}  <button id='don' onClick={()=>handleDone(idOrange)}>☑ Done</button> <button  id='delete' onClick={()=>handleDelete(idOrange)}>✖ Delete</button>  </li>
          ))
        }
    </ul>

    </div>
  )
}

export default State
