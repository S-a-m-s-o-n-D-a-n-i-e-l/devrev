import React,{useState,useEffect} from "react";
import Table from './Table';
import {db} from "./config";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

function Header()
{
    const [author,setAuthor]=useState("");
    const [title,setTitle]=useState("");
    const [subject,setSubject]=useState("");
    const [date,setDate]=useState("");
    const [data,setData]=useState([]); 
    const [category, setCategory]  = useState("");
   useEffect(()=>{
    db.collection('Books').onSnapshot(snapshot=>{
      setData(snapshot.docs.map(doc=>({data:doc.data()})))
    })
  },[]) 
    const [search, setSearch] = useState(data);
    useEffect(() => {
      setSearch(data);
    },[data]);
   useEffect(() => {
        setSearch(
          data
            .filter((dat) => {
              return dat.data.Author?.toLowerCase().includes(author.toLowerCase());
            })
            .filter((dat) => {
              return dat.data.Title?.toLowerCase().includes(title.toLowerCase());
            })
            .filter((dat) => {
              return dat.data.Category?.toLowerCase().includes(category.toLowerCase());
            }).filter((dat)=>{
              return (dat.data.PublishDate?.toDate().toDateString().toLowerCase().includes(date.toLowerCase()));
            })
          );
          // console.log(data.data.PublishDate.millisecond)
      },[author,title,subject,date,category]);
      //console.log(data[0].data.PublishDate.toDate().toDateString());    
    return(
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3" style={{backgroundColor:"#F5F5F5"}}>
    <div className="container-fluid">
    <a className="navbar-brand" href="#">Library Management System</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <form className="d-flex">
        <input className="form-control me-2 mr-3" type="text" placeholder="Filter by Author" aria-label="Search" onChange={(e)=>setAuthor(e.target.value)}/>
        <input className="form-control me-2 mr-3" type="text" placeholder="Filter by Title" aria-label="Search" onChange={(e)=>setTitle(e.target.value)}/>
        <select className="form-control me-2 mr-3" onChange={(e)=>{setCategory(e.target.value)}}>
                <option value={""}>Category</option>
                <option value={"CSE"}>CSE</option>
                <option value={"IT"}>IT</option>
                <option value={"ECE"}>ECE</option>
                <option value={"EEE"}>EEE</option>
                <option value={"AIDL"}>AIDL</option>
                <option value={"SPIRITUALITY"}>SPIRITUALITY</option>
                <option value={"GK"}>GK</option>
                <option value={"FANTASY"}>FANTASY</option>
                <option value={"DIRECTION"}>DIRECTION</option>
                <option value={"GAMES"}>GAMES</option>
              </select>
        <input className="form-control me-2 mr-3" type="text" placeholder="Filter by Date" aria-label="Search" onChange={(e)=>setDate(e.target.value)}/>
        <Link to="/Login">
          <button type="button" className="btn btn-primary btn-sm ml-5 mt-1">Admin Login</button>      
        </Link>
      </form>
    </div>
    </div>
    </nav>
    <Table search={search} data={data}/>
    </div>);
    
}
export default Header;
