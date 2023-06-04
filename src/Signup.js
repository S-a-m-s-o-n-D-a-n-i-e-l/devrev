import { useState } from "react";
import React from "react";
import "./login.css";
import { auth } from "./config";
// import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import Admin from "./Admin";

function Signup()
{
    const[email,setEmail]=useState('');
    const[pass,setPass]=useState('');

    const signup=(e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,pass).then((userCredential)=>{
            console.log(userCredential);
        }).catch((error) => {
            console.log(error);
        })
    }
    return(<div className="text-center" id="main">
        <form onSubmit={signup}>
        <h1 >  <small className="text-body-secondary">Sign up</small></h1>
        <input type="email" placeholder="Email-Address" className="form-floating mt-5" onChange={(e)=>setEmail(e.target.value)} required></input>
        <br></br>
        <input type="password" placeholder="Password" className="form-floating mt-3" onChange={(e)=>setPass(e.target.value)} required></input>
        <br></br>
        <button className="btn mt-3">Sign Up</button>
        </form>
    </div>);
}
export default Signup;