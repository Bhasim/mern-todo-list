import { Route, Routes } from "react-router-dom";
import './App.css';
import Signin from "./Signin";
import Signup from "./Signup";
import State from "./State";



function App() {
  return (
    <div className="App">
   
<h1>Private ToDo List</h1>

      <Routes>
        <Route path="/todos" element={<State />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/" element={<Signup />}/>
      </Routes>
   
    </div>
  );
}

export default App;
