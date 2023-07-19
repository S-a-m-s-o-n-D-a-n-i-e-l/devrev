import React,{useState} from "react";
import {useEffect } from "react";
import {db} from "./config";
import UserBorrowed from "./userborrwed";
import Adminbook from "./adminbooktable";

function Adminborrowed()
{
  const divStyle = {
    backgroundColor: 'wheat',
    color: 'white',
    height:'10px'
  };
    const [seacrh,setSearch]=useState([]);
    const [input,setinput]=useState("");
    
    const [data,setData]=useState([]);
    useEffect(()=>{
        db.collection('Users').onSnapshot(snapshot=>{
          setData(snapshot.docs.map(doc=>({data:doc.data()})))
        })
      },[])
      useEffect(() => {
        setSearch(data);
      },[data]);
    useEffect(()=>{
        setSearch(data.filter((dat)=>{
            return dat.data.Name?.toLowerCase().includes(input.toLowerCase());
        }));
    },[input]);
    //console.log(seacrh);
    return(<div>
        {/* <h1 className="d-flex justify-content-center mt-3">Books Borrowed</h1> */}
        {/* <BookTable></BookTable> */}
        <UserBorrowed></UserBorrowed>
        <div style={divStyle}></div>
        <h1 className="d-flex justify-content-center mt-3">Books Borrowed Data</h1>
        <div className="d-flex justify-content-end">
            <input type="text" className="mr-5" placeholder="Search by Name" onChange={(e)=>{setinput(e.target.value)}}/>
        </div>
        {seacrh.map(({data:{Name,BorrowedBooks,BorrowedCount,Email}},id)=>{
                return(
                    BorrowedCount > 0 && (
                        <div key={id}>
                    <h2>{Name}</h2>
                    <p>Email: {Email}</p>
                    <p>BorrowedBooks Count: {BorrowedCount}</p>
                    <Adminbook data={BorrowedBooks} />
                  </div>));
        })};
    </div>);    
}

export default Adminborrowed;