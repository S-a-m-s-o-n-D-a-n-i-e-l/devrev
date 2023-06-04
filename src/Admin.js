import React from "react";
import { db } from "./config";
import { useState } from "react";


function Admin()
{
    function addData(newDataObj)
    {
        db.collection("Books").doc().set(newDataObj).catch((err)=>{
            alert(err);
        })
        alert("Data Inserted"); 
    }
    const [Author,setAuthor]=useState("");
    const [Title,setTitle]=useState("");
    const [Subject,setSubject]=useState("");
    const [PublishDate,setPublishDate]=useState("");
    const [Category,setCategory]=useState("");
    const [BookID,setBookID]=useState(""); 
    return(<div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">Library Management System</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        </div>
        </div>
        </nav>
        <h1>Insert Data</h1>
        <div>
        <label className="ml-3">Author Name</label>  
        <input id="name1" className="form-control me-2 ml-3 mb-3 col-6" type="text" placeholder="Author" aria-label="Search" onChange={(e)=>setAuthor(e.target.value)} required/>
        <label className="ml-3">Title</label>  
        <input id="name2" className="form-control me-2 ml-3 mb-3 col-6" type="text" placeholder="Title" aria-label="Search" onChange={(e)=>setTitle(e.target.value)} required/>
        <label className="ml-3">Subject</label>   
        <input id="name3" className="form-control me-2 ml-3 mb-3 col-6" type="text" placeholder="Subject" aria-label="Search" onChange={(e)=>setSubject(e.target.value)} required/>
        <label className="ml-3">Category</label>  
        <input  id="name4" className="form-control me-2 ml-3 mb-3 col-6" type="text" placeholder="Category" aria-label="Search" onChange={(e)=>setCategory(e.target.value)} required/>
        <label className="ml-3">Publish Date</label>  
        <input id="name5" className="form-control me-2 ml-3 mb-3 col-6" type="date" placeholder="PublishDate" aria-label="Search" onChange={(e)=>setPublishDate(new Date(e.target.value))} required/>
        <label className="ml-3">Book ID</label>  
        <input id="name6" className="form-control me-2 ml-3 mb-3 col-6" type="text" placeholder="BookID" aria-label="Search" onChange={(e)=>setBookID(e.target.value)} required/>
        <button className="btn btn-primary btn-rounded ml-5 mb-5" onClick={()=>{
            addData({Author,Title,Subject,PublishDate,Category,BookID})
            document.getElementById("name1").value="";
            document.getElementById("name2").value="";
            document.getElementById("name3").value="";
            document.getElementById("name4").value="";
            document.getElementById("name5").value="";
            document.getElementById("name6").value="";  
        }}>Insert</button>
        </div>
    </div>);
}
export default Admin;