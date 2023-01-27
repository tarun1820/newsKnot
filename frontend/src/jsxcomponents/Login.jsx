// import envelopeopen from "./envelope-open-regular.svg";
// import eveloponensolid from "./envelope-open-solid.svg";
import locksolid from "../png&svg/lock-solid.svg";
import usersolid from "../png&svg/user-solid.svg";
import metalogo from "../png&svg/meta.png";
import googlelogo from "../png&svg/google.png";
import '../cssfiles/login.css';
import { Link } from "react-router-dom";

function Login() {
    return (
        
            <div id="login-Container">
            <h1 id="pro-Name">NewsKnot</h1>
            <div id="LoginBox">
                <h1 className="Login-heading" >Login</h1>
                <div id="Login-Form">
                <form type="post" action="/login" style={{marginTop:0}}>
                    <label className="label-form-item" >Username</label><br/>
                    <div className="image-side-inputfield">
                    <img alt="" src={usersolid} className="icon"/>
                    <input type="text" id="username-textField" className="input-form-item" placeholder="Type Your Username"  /><br />
                    </div>
                    <hr className="line-btw-items" />
                    <label className="label-form-item" >Passcode</label><br />
                    <div className="image-side-inputfield" >
                    <img alt="" src={locksolid} className="icon" />
                    <input type="password" id="passcode-field" className="input-form-item" placeholder="Type Your Passcode" /><br/>
                    </div>
                    <hr className="line-btw-items"/>
                    <label className="label-form-item" id="forget-passcode">Forgot passcode?</label>            
                </form>
                </div>
                <input type="button" className="login-page-button" id="login-button" value="LOGIN" />   
                <p className="signup-using">Or Sign Up using</p>
                
                <div id="sign-up-icons">
                    <img alt="" className="s-icons" src={googlelogo} />
                    <img alt="" className="s-icons" src={metalogo} style={{width:38}}/>
                </div>
            </div>
            
            <div id="signup-div">
                <p id="no-acc"> Have no account yet?</p>
                <Link id="signup-page" to='/signup'>Sign Up</Link>        
            </div>
            </div>
       
    );};

export default Login;