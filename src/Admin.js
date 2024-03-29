import React from "react";
import { db } from "./config";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';


function Admin()
{
    const addData=(e)=>
    {
        e.preventDefault();
        const collectionref = db.collection("Books");
        const newdocref = collectionref.doc();
        const id = newdocref.id; // Generate a unique ID for the document
        const BookID = id; // Use the same ID for BookID
        newdocref
          .set({ Author, Title, Subject, PublishDate, Category, id, BookID })
          .then(() => {
            alert("Data Inserted");
            document.getElementById("name1").value="";
            document.getElementById("name2").value="";
            document.getElementById("name3").value="";
            document.getElementById("name4").value="";
            document.getElementById("name5").value="";
            document.getElementById("name6").value="";
          })
          .catch((err) => {
            //alert(err);
          });
        //alert("Data Inserted"); 
    }
    const [Author,setAuthor]=useState("");
    const [Title,setTitle]=useState("");
    const [Subject,setSubject]=useState("");
    const [PublishDate,setPublishDate]=useState("");
    const [Category,setCategory]=useState("");
    //const [BookID,setBookID]=useState(""); 
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
        <div className="d-flex justify-content-end mr-3 mt-2">
          <a href="/">
            <FontAwesomeIcon icon={faHome} />Home
          </a>
        </div>
        <h1>Insert Data</h1>
        <form onSubmit={addData}>
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
        <button className="btn btn-primary btn-rounded ml-5 mb-5" >Insert</button>
        </div>
        </form>
    </div>);
}
export default Admin;