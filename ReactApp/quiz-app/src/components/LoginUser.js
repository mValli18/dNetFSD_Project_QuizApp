import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import "./Login.css";
import image from '../quizb1.jpg';

function LoginUser() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    var [usernameError,setUsernameError]=useState("");
    var [passwordError,setPasswordError]=useState("");
    var checkUSerData = ()=>{
        if(username==='')
        {
            setUsernameError("Username cannot be empty");
            return false;
        }
        else{
            setUsernameError("");
        }
           
        if(password===''){
            setPasswordError("Password cannot be empty");
            return false;
        }
        else{
            setPasswordError("");
        }
    }
    const Login = (event)=>{
        event.preventDefault();
        var checkData = checkUSerData();
        if(checkData===false)
        {
            alert('please check your data')
            return;
        }
        
        axios.post("http://localhost:5252/api/User/login",{
            username: username,
            password:password
        })
        .then((userData)=>{
            var token = userData.data.token;
            localStorage.setItem("token",token);
            var username=userData.data.username;
            localStorage.setItem("username",username);
            var role=userData.data.role;
            localStorage.setItem("role",role);
            alert('Welcome to the quizapp =>'+username);
            navigate("/")
            
        })
        .catch((err)=>{
            if(err.response.data==="Invalid username or password"){
                alert('Either username or password does not match');
            }
            console.log(err)
        })
    }
    const logout = () => {
        // Remove the token from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        // Show an alert
        alert("You are logged out successfully.");
        navigate("/logout");
      };

  return (
    <div className="login-container">
      <div className="login-card">
        <form className="loginForm">
          <h1>Login</h1>
          <br/>
          <label >Username :</label>
          <br/>
          <input
            type="text"
            className="form-control"
            placeholder="Please enter Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          
          {usernameError && (
            <label className="alert alert-danger">{usernameError}</label>
          )}
          <label >Password :</label>
          <br/>
          <input
            type="password"
            className="form-control"
            placeholder="Please enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {passwordError && (
            <label className="alert alert-danger">{passwordError}</label>
          )}
          <br />
          <button className="btn btn-primary button" onClick={Login}>
            Login
          </button>
          <h6 style={{ whiteSpace: 'nowrap' }}><pre>Don't have an account? </pre><Link to="/register">Register</Link></h6>
        </form>
      </div>
      <div className="image-card">
        <img
          src={image}
          alt="Your Image"
          className="image-content"
        />
      </div>
    </div>
  );
}

export default LoginUser;