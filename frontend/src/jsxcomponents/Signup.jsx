import * as React from 'react';
import envelopeopen from "../png&svg/envelope-open-regular.svg";
import locksolid from "../png&svg/lock-solid.svg";
import usersolid from "../png&svg/user-solid.svg";
import metalogo from "../png&svg/meta.png";
import googlelogo from "../png&svg/google.png";
import "../cssfiles/signup.css";
import { useState } from "react";
import axios from "axios"; //for get request to server
import { Link, useNavigate } from "react-router-dom"; //for routing purpose
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Signup() {
  const navigate = useNavigate();
  //json object for storing email,password and username when changed
  const [loginCredtials, setLoginCreditials] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [userName , setUserName] = useState(2);
  const [passwordValidate ,setPasswordValidate] = useState(2);
  const [message , setMessage] = useState("");
  const [open,setOpen] = useState(false);

  const handleClose = (event , reason) => {
      if(reason === 'clickaway'){
          return;
      }
      setOpen(false);
  };

  //funtion to handle change state when chages are made in input fields tags
  function handleNameChange(event){
    const { name, value } = event.target;
    // const value=event.target.value;
    setLoginCreditials((prevItem) => {
      return {
        ...prevItem,
        [name]: value,
      };
    });

    let str = value;
    let patt = /[^A-Za-z0-9_]/g;
    if(str === ""){
      setUserName(2);   // dont take any action if empty
    }else if(patt.test(str) === true || str.length <= 4 || str.length >= 25){              // Only should allow characters from character class , if others included Dont validate
      setUserName(1);
    }else{
      setUserName(0);
    }
  }


  function handleEmailChange(event){
    const { name, value } = event.target;
    // const value=event.target.value;
    setLoginCreditials((prevItem) => {
      return {
        ...prevItem,
        [name]: value,
      };
    });
  }

  function handlePasswordChange(event){
    const { name, value } = event.target;
    // const value=event.target.value;
    setLoginCreditials((prevItem) => {
      return {
        ...prevItem,
        [name]: value,
      };
    });

    let str = value;
    let patt1 = /[\!@\#\$\%\^\&\*\(\)\_\-\+\=]/g
    let patt2 = /[A-Z]/g
    let patt3 = /[0-9]/g

    if(str === ""){
      setPasswordValidate(() => {
        return 2;
      })
    }else if(patt1.test(str) === true && patt2.test(str) === true && patt3.test(str) === true && str.length >= 8){
      setPasswordValidate(() => {
        return 0;
      })
    }else{
      setPasswordValidate(() => {
        return 1;
      })
    }
  }


  function handleSubmit(event) {
    const { username, email, password } = loginCredtials;
    event.preventDefault();
    const data = { username, email, password };
    setOpen(true);
    if(userName === 0  && passwordValidate===0){
      axios
      .post("http://localhost:5000/signup", data, { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res.data.error === "email alredy registered") {
          setMessage("Email Already Exists");
          console.log(res.data.error);
        } else if (res.data.error === "username alredy registered") {
          setMessage("Username Already Exists")
        } else if (res.data.status === "ok") {
          setMessage("Successfully All fields validated")
          navigate("/user", { state: { username: username } });
        } else {
        }
      })
      .catch(
        (err) => console.log(err)
      );
    }else{
      if(userName === 1 || userName === 2 ){
        if(userName === 1){
          setMessage("UserName should only contain Alphanumeric and underscores with minimum 4 characters and maximum 25 characters")
        }else{
          setMessage("UserName field is empty")
        }
      }else{
        if(passwordValidate === 1){
          setMessage("Password must contain one UPPER case ,one numeric and one special character with minimum length of 8 characters")
        }else{
          setMessage("Password field is empty")
        }
      }
    }
  }
  return (
    <div id="signup-Container">
      <div className = "">
            <Snackbar anchorOrigin={{ vertical:'top' , horizontal:'center' }} open = {open} autoHideDuration = {3000}  onClose = {handleClose} sx= {{width:1}}>
                <Alert onClose={handleClose} severity="error">{message}</Alert>
            </Snackbar>
        </div>
      <h1 id="pro-Name">NewsKnot</h1>
      <div id="signupBox">
        <h1 className="signup-heading">Sign Up</h1>
        <div id="signup-Form">
          {/* <p className={classNameForuserExist}>{banner}</p> */}
          <form onSubmit={handleSubmit} style={{ marginTop: 0 }}>
            <label className="label-form-item">Username</label>
            <br />
            <div className="image-side-inputfield">
              <img alt="" src={usersolid} className="icon" />
              <input
                required
                minLength={3}
                onChange={handleNameChange}
                value={loginCredtials.username}
                name="username"
                type="text"
                id="username-textField"
                className="input-form-item"
                placeholder="Type Your Username"
              />
              <br />
            </div>
            <hr className="line-btw-items" />
            <label className="label-form-item">Email</label>
            <br />
            <div className="image-side-inputfield">
              <img alt="" src={envelopeopen} className="icon" />
              <input
                required
                onChange={handleEmailChange}
                value={loginCredtials.email}
                name="email"
                type="email"
                id=""
                className="input-form-item"
                placeholder="Enter Your Email"
              />
              <br />
            </div>
            <hr className="line-btw-items" />
            <label className="label-form-item">Passcode</label>
            <br />
            <div className="image-side-inputfield">
              <img alt="" src={locksolid} className="icon" />
              <input
                required
                minLength={8}
                onChange={handlePasswordChange}
                value={loginCredtials.password}
                name="password"
                type="password"
                id="passcode-field"
                className="input-form-item"
                placeholder="Type Your Passcode"
              />
              <br />
            </div>
            <hr className="line-btw-items" />
            <button
              type="submit"
              className="signup-page-button"
              id="signup-button"
            >
              Create Account
            </button>
            
          </form>
        </div>
        <p className="signup-using">Or Sign Up using</p>
        <div id="sign-up-icons">
          <a href="http://localhost:5000/auth/google">
            <img alt="" className="s-icons" src={googlelogo} />
          </a>
          <img
            alt=""
            className="s-icons"
            src={metalogo}
            style={{ width: 38 }}
          />
        </div>
      </div>

      <div id="signup-div">
        <p id="acc"> Already Have an account?</p>
        <Link id="login-page" to="/login">
          Login
        </Link>
      </div>
      
    </div>
  );
}

export default Signup;
