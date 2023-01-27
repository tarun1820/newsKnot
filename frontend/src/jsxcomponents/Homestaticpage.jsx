import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Homestaticpage = () => {
    const navigate = useNavigate();
    
  return (
    <div>
    <h1>Homestaticpage</h1>
    <button onClick={()=>{navigate('/login')}}> login </button>
    <button onClick={()=>{navigate('/signup')}}>signup</button>
    </div>
  )
}

export default Homestaticpage;