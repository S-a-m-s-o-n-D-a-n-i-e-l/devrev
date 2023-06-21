import React,{useState,useEffect,useRef} from "react";
import Table from './Table';
import {db} from "./config";
import { NavLink , useLocation, useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import logstate from "./logstate";

function Header()
{
    // const location=useLocation();
    const[dataa,setDataa]=useState(JSON.parse(localStorage.getItem('userdetails')));
   // const storedData = localStorage.getItem('userData');
    //const parsedData = JSON.parse(storedData);
    //const dataa=location.state;
    //console.log(dataa);
    const [singedstate,setSignedState]=useState(dataa!==null?true:false);
    //console.log(dataa.details.length);
    const path=useNavigate();
    const [btnname,setbtnname]=useState("Sign Up/Login");
    const [btnpath,setbtnPath]=useState("/signup");
    const [titlename,setTitleName]=useState("Library Management System");
    const [user,setUser]=useState(false);
    const [name,setName]=useState([]);
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
    useEffect(()=>{
      if(singedstate)
      {
          setUser(dataa[0].data.IsAdmin);
          if(dataa.length>0)
        {
          if(!dataa[0].data.IsAdmin)
          {
            setbtnname("Borrowed Books"+" : "+dataa[0].data.BorrowedCount);
            setbtnPath("/userborrowedbooks");
            setTitleName(dataa[0].data.Name);
          }else{
            setbtnname("Borrowed Books");
            setbtnPath("/adminborrowedbooks");
            setTitleName(dataa[0].data.Name);
          }
        }else{
          setbtnname("Sign Up/Login");
          setbtnPath("/signup");
          setTitleName("Library Management System");
        }
      }
    },[dataa]);
    // console.log(dataa+" "+"HELLO");
    // const admin=dataa[0].data.IsAdmin;
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
      },[author,title,subject,date,category]);
      const userLogout=()=>{
        setbtnname("Sign Up/Login");
        setbtnPath("/signup");
        setTitleName("Library Management System");
        //dataa.splice(0,2);
        //localStorage.removeItem('userdetails');
        setUser(false);
        setDataa(
        localStorage.clear()
        );
        setDataa(null);
        setSignedState(false);
        //path("/");
      }
      // console.log(dataa);
    return(
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3" style={{backgroundColor:"#F5F5F5"}}>
    <div className="container-fluid">
    <a className="navbar-brand">{titlename}</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <input className="nav-item form-control me-2 mr-3" type="text" placeholder="Filter by Author" aria-label="Search" onChange={(e)=>setAuthor(e.target.value)}/>
        <input className="nav-item form-control me-2 mr-3" type="text" placeholder="Filter by Title" aria-label="Search" onChange={(e)=>setTitle(e.target.value)}/>
        <select className="nav-item form-control me-2 mr-3" onChange={(e)=>{setCategory(e.target.value)}}>
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
        <input className="nav-item form-control me-2 mr-3" type="text" placeholder="Filter by Date" aria-label="Search" onChange={(e)=>setDate(e.target.value)}/>
        <Link to={btnpath}>
          <button type="button" className="btn btn-primary btn-sm mt-1 nav-item">{btnname}</button>      
        </Link>
        { singedstate &&
          <button type="button" className="btn btn-primary btn-sm mt-1 ml-1 nav-item" onClick={userLogout}>Logout</button>      
        }
        {
          user && <button type="button" className="btn btn-primary btn-sm mt-1 ml-1 nav-item" onClick={()=>{
            path("/admin")
          }}>Add Books</button>
        }        
    </div>
    </div>
    </nav>
    <Table search={search} data={data} userdata={dataa} signedstate={singedstate}/>
    </div>);
    
}
export default Header;
