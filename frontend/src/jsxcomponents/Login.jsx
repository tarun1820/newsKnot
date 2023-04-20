import * as React from "react";
import locksolid from "../png&svg/lock-solid.svg";
import usersolid from "../png&svg/user-solid.svg";
import googlelogo from "../png&svg/google.png";
import "../cssfiles/login.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  //json object for storing email,password and username when changed
  // const [userExist, setUserExist] = useState(0);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [loginCredtials, setLoginCreditials] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setLoginCreditials((prevItem) => {
      return {
        ...prevItem,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    const { username, password } = loginCredtials;
    const data = JSON.stringify({ username, password });
    console.log("usename==", username);
    setOpen(true);
    const options = {
      withCredentials: true,
      headers: { "content-type": "application/json" },
    };
    axios
      .post("http://localhost:5000/login", data, options)
      .then((res) => {
        if (res.data.status === "ok") {
          setMessage("Login Successfull");
          if (
            location.state != null &&
            location.state.url === "/user/article"
          ) {
            return navigate(`/user/article/${location.state.article_data}`, {
              state: { article_data: location.state.article_data },
            });
          }
          navigate("/user", { state: { username: username } });
        } else {
          setMessage("Username or Password is Incorrect");
        }
      })
      .catch((err) => console.log(err));
    event.preventDefault();
  }

  // console.log(banner);
  return (
    <div id="login-Container">
      <div className="">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          sx={{ width: 1 }}
        >
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
      </div>
      <h1 id="pro-Name">NewsKnot</h1>
      <div id="LoginBox">
        <h1 className="Login-heading">Login</h1>
        <div id="Login-Form">
          <form
            onSubmit={handleSubmit}
            type="post"
            action="/login"
            style={{ marginTop: 0 }}
          >
            <label className="label-form-item">Username</label>
            <br />
            <div className="image-side-inputfield">
              <img alt="" src={usersolid} className="icon" />
              <input
                required
                onChange={handleChange}
                name="username"
                value={loginCredtials.username}
                type="text"
                id="username-textField"
                className="input-form-item"
                placeholder="Type Your Username"
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
                name="password"
                value={loginCredtials.password}
                type="password"
                id="passcode-field"
                className="input-form-item"
                placeholder="Type Your Passcode"
              />
              <br />
            </div>
            <hr className="line-btw-items" />
            <label className="label-form-item" id="forget-passcode">
              Forgot passcode?
            </label>
            <button
              type="submit"
              className="login-page-button"
              id="login-button"
            >
              LOGIN
            </button>
          </form>
        </div>
        {/* <input type="button" className="login-page-button" id="login-button" value="LOGIN" />    */}
        <p className="signup-using">Or Sign Up using</p>

        <div id="sign-up-icons">
          <a href="http://localhost:5000/auth/google">
            <img alt="" className="s-icons" src={googlelogo} />
          </a>
        </div>
      </div>

      <div id="signup-div">
        <p id="no-acc"> Have no account yet?</p>
        <Link id="signup-page" to="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
