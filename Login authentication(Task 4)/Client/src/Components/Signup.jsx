import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default function Signup() {
    const [name, setName] = useState("");
    const [number, setNumber] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handelSubmit = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:5400/signup", {name, number, email, password})
        .then(res=>{
            if(res.status == 201){
                console.log(`user created successfully`);
                navigate("/login");
            }
        })
        .catch(err=>{
            if(err.response && (err.response.status === 400)){
                window.alert("Email already exists. Please use a differnt email")
            }else{
                console.log(err)
            }
        })
    }

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Sign up</h1>
        <form onSubmit={handelSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" onChange={e=>setName(e.target.value)} required/>
          </div>
          <div className="mb-3">
            <label className="form-label">Contact number</label>
            <input type="number" className="form-control" onChange={e=>setNumber(e.target.value)} required/>
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" onChange={e=>setEmail(e.target.value)} required/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" onChange={e=>setPassword(e.target.value)} required/>
          </div>
          <p>Already have an account?<Link to="/login">login</Link></p>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
