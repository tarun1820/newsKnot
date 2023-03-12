import envelopeopen from "../png&svg/envelope-open-regular.svg";
import locksolid from "../png&svg/lock-solid.svg";
import usersolid from "../png&svg/user-solid.svg";
import metalogo from "../png&svg/meta.png";
import googlelogo from "../png&svg/google.png";
import "../cssfiles/signup.css";
import { useState } from "react";
import axios from "axios"; //for get request to server
import { Link, useNavigate } from "react-router-dom"; //for routing purpose

function Signup() {
  const [userExist, setUserExist] = useState(0);
  const navigate = useNavigate();
  //json object for storing email,password and username when changed
  const [loginCredtials, setLoginCreditials] = useState({
    email: "",
    username: "",
    password: "",
  });

  //funtion to handle change state when chages are made in input fields tags
  function handleChange(event) {
    console.log(loginCredtials);
    const { name, value } = event.target;
    // const value=event.target.value;
    setLoginCreditials((prevItem) => {
      return {
        ...prevItem,
        [name]: value,
      };
    });
  }

  //function to handle submit button when it is clicked
  function handleSubmit(event) {
    const { username, email, password } = loginCredtials;

    // if(username==="" || password=""){
    //   setUserExist(-1)
    //   return
    // }
    event.preventDefault();
    const data = { username, email, password };
    // console.log(data);
    // const options = {
    //   baseURL: "",
    //   withCredentials: false,
    //   headers: {"content-type": "application/json"}
    // }
    //axios post reqest for sign in
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:5000/signup", data, { withCredentials: true })
      .then((res) => {
        if (res.data.error === "email alredy regitered") {
          setUserExist(1);
        } else if (res.data.error === "username alredy regitered") {
          setUserExist(2);
        } else if (res.data.status === "ok") {
          setUserExist(3);
          navigate("/user", { state: { username: username } });
        } else {
          setUserExist(0);
        }
        // console.log(res.data)
      })
      .catch(
        (err) => console.log(err)
        // console.log("some thing went wrong");
      );

    // event.preventDefault();
    // console.log(username,email,password);
  }
  var classNameForuserExist = "";
  var banner;
  if (userExist === 0) {
    classNameForuserExist = "user_exists__not";
  } else {
    classNameForuserExist = "user_exists";
    if (userExist === 1) {
      banner = "User with email Already Exists";
    } else if (userExist === 2) {
      banner = "User with username Already Exists";
    } else {
      banner = "Account created Successfully";
    }
  }

  return (
    <div id="signup-Container">
      <h1 id="pro-Name">NewsKnot</h1>
      <div id="signupBox">
        <h1 className="signup-heading">Sign Up</h1>
        <div id="signup-Form">
          <p className={classNameForuserExist}>{banner}</p>
          <form onSubmit={handleSubmit} style={{ marginTop: 0 }}>
            <label className="label-form-item">Username</label>
            <br />
            <div className="image-side-inputfield">
              <img alt="" src={usersolid} className="icon" />
              <input
                required
                minLength={3}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
          <img alt="" className="s-icons" src={googlelogo} />
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
