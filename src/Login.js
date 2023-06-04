import { useState } from "react";
import React from "react";
import "./login.css";
import { auth } from "./config";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import Admin from "./Admin";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login()
{
    const[email,setEmail]=useState('');
    const[pass,setPass]=useState('');
    const navigate=useNavigate();
    const signin=(e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth,email,pass).then((userCredential)=>{
            navigate("/admin");
        }).catch((error) => {
            alert("Invalid Email or Password");
        })
    }
    return(<div className="text-center" id="main">
        <form onSubmit={signin}>
        <h1 >  <small className="text-body-secondary">Login</small></h1>
        <input type="email" placeholder="Email-Address" className="form-floating mt-5" onChange={(e)=>setEmail(e.target.value)}></input>
        <br></br>
        <input type="password" placeholder="Password" className="form-floating mt-3" onChange={(e)=>setPass(e.target.value)}></input>
        <br></br>
        <button className="btn mt-3">Log In</button>
        </form>
    </div>);
}

export default Login;