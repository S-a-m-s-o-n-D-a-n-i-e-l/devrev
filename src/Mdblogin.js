import React, { useEffect, useState } from 'react';
import { db } from "./config";
import {
  MDBIcon
}
from 'mdb-react-ui-kit';
import "./Mdblogin.css";
import { Link, useNavigate } from 'react-router-dom';

function MdbLogin() {
  const navigate=useNavigate();
  const insertData=(e)=>
  {
    e.preventDefault();
    console.log(e);
    const collectionref=db.collection("Users");
    const newdocref=collectionref.doc();
    const  id=newdocref.id;
    newdocref.set( {Name,Email,Password,IsAdmin,BorrowedBooks,BorrowedCount,id}).catch((err)=>{
      alert(err);
    })
    navigate("/login");
    
  }

  const[Name,setName]=useState("");
    const[Email,setEmail]=useState("");
    const[Password,setPass]=useState("");
    const[cpass,setCpass]=useState("");
    const[disable,setDisable]=useState(true);
    const IsAdmin=false;
    const BorrowedCount=0;
    const BorrowedBooks=[];

  useEffect(()=>{
    Password===cpass?setDisable(false):setDisable(true);
  },[cpass])

  return (
    <div className='Auth-form-container'>
      <form  className='Auth-form' onSubmit={insertData}>
        <div className='Auth-form-content'>
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className='form-group mt-3'>
          <MDBIcon fas icon="user me-3" size='lg'/>
          <label>USER NAME</label>
          <input className="form-control mt-1" onChange={(e)=>{setName(e.target.value)}} required></input>
          </div>
          <div className='form-group mt-3'>
          <MDBIcon fas icon="envelope me-3" size='lg'/>
          <label>E-MAIL</label>
          <input type='email' className="form-control mt-1" onChange={(e)=>{setEmail(e.target.value)}} required></input>
          </div>
          <div className='form-group mt-3'>
          <MDBIcon fas icon="lock me-3" size='lg'/>
          <label>PASSWORD</label>
          <input type='password' className="form-control mt-1" onChange={(e)=>{setPass(e.target.value)}} required></input>
          </div>
          <div className='form-group mt-3'>
          <MDBIcon fas icon="key me-3" size='lg'/>
          <label>CONFIRM PASSWORD</label>
          <input type='password' className="form-control mt-1" onChange={(e)=>{setCpass(e.target.value)}} required></input>
          </div>
          <div className='form-group mt-3'>
            <button className="btn btn-primary mb-4 form-control mt-2" disabled={disable} size='lg'>Sign UP</button>
          </div>
          <div>
            <Link to="/login" className='d-flex justify-content-center'>Login</Link>
          </div>
        </div>
    </form>
    </div>
  );
}

export default MdbLogin;