import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from "./Components/Home";
import './App.css'

function App() {

  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/singup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </Router>
    </div>
  )
}

export default App
