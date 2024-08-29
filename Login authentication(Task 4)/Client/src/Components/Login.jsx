import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin =(e)=>{
        e.preventDefault();
        axios.post("http://localhost:5400/login", { email, password}, {withCredentials: true})
        .then(res =>{
            if(res.data === "Success"){
              axios.get("http://localhost:5400/user", {withCredentials: true})
              .then(response=>{
                if(response.data.user){
                    navigate("/", {state:{user: response.data.user}});
                  }
                })
            }else{
                alert("Login failed") ;
            }
        })
        .catch(err=>{
          console.log(err);
          alert("Please check your email or password");
        })
    }

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" onChange={e=>setEmail(e.target.value)} required/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" onChange={e=>setPassword(e.target.value)} required/>
          </div>
          <p>
            Don't have an account? <Link to="/singup">signUp</Link>
          </p>
          <button type="submit" className="btn btn-success">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
