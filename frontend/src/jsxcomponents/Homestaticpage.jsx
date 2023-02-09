import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
export const Homestaticpage = (props) => {
    const navigate = useNavigate();
    if(props.logout===true){
      axios.get("http://localhost:5000/logout",{withCredentials:true}).then((res=>{
      console.log(res.data);
   }))
    }
  return (
    <div>
    <h1>Homestaticpage</h1>
    <button onClick={()=>{navigate('/login')}}> login </button>
    <button onClick={()=>{navigate('/signup')}}>signup</button>
    </div>
  )
}

export default Homestaticpage;