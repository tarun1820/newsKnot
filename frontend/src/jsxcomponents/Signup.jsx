import envelopeopen from "../png&svg/envelope-open-regular.svg";
// import eveloponensolid from "../png&svg/envelope-open-solid.svg";
import locksolid from "../png&svg/lock-solid.svg";
import usersolid from "../png&svg/user-solid.svg";
import metalogo from "../png&svg/meta.png";
import googlelogo from "../png&svg/google.png";
import '../cssfiles/signup.css';


import { Link, useNavigate } from "react-router-dom";



function Signup() {
  const navigate = useNavigate();
  return (
    <div id="signup-Container">
    <h1 id="pro-Name">NewsKnot</h1>
    <div id="signupBox">
        <h1 className="signup-heading" >Sign Up</h1>
        <div id="signup-Form">
        <form type="post" action="/signup" style={{marginTop:0}}>
          <label className="label-form-item" >Username</label><br />
            <div className="image-side-inputfield">
            <img alt="" src={usersolid} className="icon" />
            <input type="text" id="username-textField" className="input-form-item" placeholder="Type Your Username" /><br/>
            </div>
            <hr className="line-btw-items" />
            <label className="label-form-item" >Email</label><br/>
            <div className="image-side-inputfield">
            <img alt="" src={envelopeopen} className="icon" />
            <input type="password" id="passcode-field" className="input-form-item" placeholder="Enter Your Email" /><br/>
            </div>
            <hr className="line-btw-items" />
            <label className="label-form-item" >Passcode</label><br/>
            <div className="image-side-inputfield" >
            <img alt="" src={locksolid} className="icon" />
            <input type="password" id="passcode-field" className="input-form-item" placeholder="Type Your Passcode" /><br />
            </div>
            <hr className="line-btw-items" />
                        
        </form>
  
        </div>
        <button type="submit" className="signup-page-button" id="signup-button" >Create Account</button>   
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
