import React,{useEffect,useState} from "react";
import {auth} from "./config";
import { onAuthStateChanged } from "firebase/auth";

function AuthDetails()
{
    const[Authuser,setAuthUser]=useState(null);

    useEffect(()=>{
        const listen=onAuthStateChanged(auth,(user)=>{
            if(user)
            {
                setAuthUser(user);
            }else{
                setAuthUser(null);
            }
        })
        return()=>{
            listen();
        }
    },[])
    const signout=()=>{
        signout(user).then(()=>{
            console.log('sign out successfully');
        }).catch(error=>console.log(error));
    }
    return(<div>
            {Authuser ? <><p>{`Signed In as ${Authuser.email}`}</p><button onClick={signout}>Sign Out</button></>: <p>Signed Out</p>}
        </div>)
}

export default AuthDetails;