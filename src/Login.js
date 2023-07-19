import { useState,useEffect } from "react";
import React from "react";
import "./Mdblogin.css";
import {db} from "./config";
import {MDBIcon} from 'mdb-react-ui-kit';
import logstate from "./logstate";
import Header from "./Main";
import { Navigate, useNavigate } from "react-router-dom";
function Login()
{

    const [email,setEmail]=useState("");
    const [pass,setPassword]=useState("");
    const [data,setData]=useState([]);
    const[details,setDetails]=useState([]);
    const path=useNavigate();
    const logvalue=false;
    //Retreving data from database
    useEffect(()=>{
        db.collection('Users').onSnapshot(snapshot=>{
          setData(snapshot.docs.map(doc=>({data:doc.data()})))
        })
      },[])
    //filtering the data using the email
    useEffect(()=>{
        setDetails(data.filter((dat)=>{
            return dat.data.Email?.toLowerCase().includes(email.toLowerCase());
        }));
    },[email]);
    //validating the email and password
    const validate=(e)=>{
        e.preventDefault();
        if(details.length===0)
        {
            alert("Invalid Credentials");
        }
        if(email===details[0].data.Email && pass===details[0].data.Password){
            localStorage.setItem("userdetails",JSON.stringify(details));
            path(`/`);
        }else{  
            alert("Invalid Credentials  ");
        }
    }
    return(<div className='Auth-form-container'>
        <form className='Auth-form' onSubmit={validate}>
            <div className='Auth-form-content'>
                <h3 className="Auth-form-title">Login</h3>
                <div className='form-group mt-3'>
                <MDBIcon fas icon="user me-3" size='lg'/>
                <label>E-Mail</label>
                <input type='email' className="form-control mt-1" required onChange={(e)=>{setEmail(e.target.value)}}></input>
                </div>
                <div className='form-group mt-3'>
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <label>PASSWORD</label>
                <input type='password' className="form-control mt-1" required onChange={(e)=>{setPassword(e.target.value)}}></input>
                </div>
                <div className='form-group mt-3'>
                    <button className="btn btn-primary mb-4 form-control mt-2" size='lg'>Login</button>
                </div>
            </div>
        </form>
    </div>)
}
export default Login;