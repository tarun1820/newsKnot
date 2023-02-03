import envelopeopen from "../png&svg/envelope-open-regular.svg";
// import eveloponensolid from "../png&svg/envelope-open-solid.svg";
import locksolid from "../png&svg/lock-solid.svg";
import usersolid from "../png&svg/user-solid.svg";
import metalogo from "../png&svg/meta.png";
import googlelogo from "../png&svg/google.png";
import '../cssfiles/signup.css';

import {useState} from 'react';
import axios from "axios";//for get request to server
import { Link } from "react-router-dom";//for routing purpose

function Signup() {
  const [userExist,setUserExist] = useState(0)
  //json object for storing email,password and username when changed
  const [loginCredtials,setLoginCreditials] = useState({
    email:"",
    username:"",
    password:""
  });

  //funtion to handle change state when chages are made in input fields tags
  function handleChange(event){
      console.log(loginCredtials)
      const {name,value}=event.target;
      // const value=event.target.value;
      setLoginCreditials((prevItem)=>{
         
         return(
          {
              ...prevItem,
              [name]:value
          }
         )
      })
  }

  //function to handle submit button when it is clicked
  function handleSubmit(event){
    const {username,email,password}=loginCredtials;
    if(username==="" || password=""){
      setUserExist(-1)
      return 
    }
    const data = JSON.stringify({username,email,password});
    const options = {
      headers: {"content-type": "application/json"}
    }
    //axios post reqest for sign in
    axios.post("http://localhost:5000/signup", data, options)
    .then((res)=>{
      if(res.data.error){
          setUserExist(1);
      }
      else{
        setUserExist(0);
      }
      console.log(res.data)
    })
    // .then((data)=>console.log(data))
    .catch((err)=>console.log(err)
      // console.log("some thing went wrong");
    );
    
    event.preventDefault();
    // console.log(username,email,password);
  }

  return (
    <div id="signup-Container">
    <h1 id="pro-Name">NewsKnot</h1>
    <div id="signupBox">
        <h1 className="signup-heading" >Sign Up</h1>
        <div id="signup-Form">
        {
          userExist===1?<p style={{backgroundColor:"black",color:"white",width:150,alignContent:"center"}}>user alredy regidtered</p>:null
          
        }
        <form onSubmit={handleSubmit} style={{marginTop:0}}>
          <label className="label-form-item" >Username</label><br />
            <div className="image-side-inputfield">
            <img alt="" src={usersolid} className="icon" />
            <input onChange={handleChange} value={loginCredtials.username} name="username" type="text" id="username-textField" className="input-form-item" placeholder="Type Your Username" /><br/>
            </div>
            <hr className="line-btw-items" />
            <label className="label-form-item" >Email</label><br/>
            <div className="image-side-inputfield">
            <img alt="" src={envelopeopen} className="icon" />
            <input onChange={handleChange} value={loginCredtials.email} name="email" type="text" id="" className="input-form-item" placeholder="Enter Your Email" /><br/>
            </div>
            <hr className="line-btw-items" />
            <label className="label-form-item" >Passcode</label><br/>
            <div className="image-side-inputfield" >
            <img alt="" src={locksolid} className="icon" />
            <input onChange={handleChange} value={loginCredtials.password} name="password" type="password" id="passcode-field" className="input-form-item" placeholder="Type Your Passcode" /><br />
            </div>
            <hr className="line-btw-items" />
             <button type="submit" className="signup-page-button" id="signup-button" >Create Account</button>   
        
        
        </form>
        
        </div>
        <p className="signup-using">Or Sign Up using</p>
        <div id="sign-up-icons">
            <img alt="" className="s-icons" src={googlelogo} />
            <img alt="" className="s-icons" src={metalogo} style={{width:38}} />
        </div>
    </div>
    
    <div id="signup-div">
        <p id="acc"> Already Have an account?</p>
        <Link id="login-page" to='/login'>Login</Link>        
    </div>
    </div>
  );
}

export default Signup;
