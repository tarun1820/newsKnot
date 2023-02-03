import axios from "axios";
import {React,useState,useEffect} from "react";

function Newspage(){
    const [userData,setUserData] = useState(null);

    useEffect(()=>{
        axios.get('http://localhost:5000/userdata').then((res)=>{
             setUserData(res.data);
        })
    },[])

    if(!userData){
        return null;
    }

    return (<div>
        <h1>{userData.username}</h1>
        <p>{userData.email}</p>
      </div>) 
}