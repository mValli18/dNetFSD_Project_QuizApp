import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RegisterUser.css';
import image from '../register1.png';

function RegisterUser() {
  const roles = ["Creator", "Participant"];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [role, setRole] = useState("");
  var [usernameError, setUsernameError] = useState("");
  var [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  var checkUserData = () => {
    let isValid = true;

    if (username === "") {
      setUsernameError("Username cannot be empty");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (password === "") {
      setPasswordError("Password cannot be empty");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (role === "Select Role") {
      isValid = false;
    }

    return isValid;
  };

  const signUp = (event) => {
    event.preventDefault();
    var checkData = checkUserData();
    if (!checkData) {
      alert('Please check your data');
      return;
    }

    axios.post("http://localhost:5252/api/User/register", {
      username: username,
      role: role,
      password: password
    })
      .then((userData) => {
        console.log(userData);
        alert('Welcome to the quizapp ' + username);
        navigate("/quizs");
      })
      .catch((err) => {
        if (err.response.data === "Duplicate username") {
          alert('You already have an account, please login');
        }
        console.log(err);
      });
  }

  const goToLogin = () => {
    navigate("/login");
  }

  return (
    <div className="registration-container">
      <div className="registration-card">
        <form className="registerForm">
          <h1>Register</h1>
          <label >Username :</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
          />
          {usernameError && (
            <label className="alert alert-danger">{usernameError}</label>
          )}
          <label >Password :</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          {passwordError && (
            <label className="alert alert-danger">{passwordError}</label>
          )}
          <label >Re-Type Password :</label>
          <input
            type="password"
            className="form-control"
            value={repassword}
            onChange={(e) => { setRePassword(e.target.value) }}
          />
          <label >Role :</label>
          <select
            className="form-select"
            onChange={(e) => { setRole(e.target.value) }}
          >
            <option value="select">Select Role</option>
            {roles.map((r) => (
              <option value={r} key={r}>{r}</option>
            ))}
          </select>
          <br />
          <button className="btn btn-primary button" onClick={signUp}>Sign Up</button>
          
          <br />
          <hr />
          <label >Already have an account? Please login</label>
          <button className="btn btn-login button" onClick={goToLogin}>Login</button>
        </form>
      </div>
      <div className="image-card">
        <img
          src={image}
          alt="Your Image"
          width="500px"
          className="image-content"
        />
      </div>
    </div>
  );
}

export default RegisterUser;