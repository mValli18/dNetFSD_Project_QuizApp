import { useState } from "react";
import './RegisterUser.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterUser(){
    const roles =["Creator","Participant"];
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [repassword,setrePassword] = useState("");
    const [role,setRole] = useState("");
    var [usernameError,setUsernameError]=useState("");
    var [passwordError,setPasswordError]=useState("");
    const navigate = useNavigate();

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
        if(role==='Select Role'){
            return false;
        }
        return true;
    }
    const signUp = (event)=>{
        event.preventDefault();
        var checkData = checkUSerData();
        if(checkData===false)
        {
            alert('please check your data')
            return;
        }
        
        axios.post("http://localhost:5252/api/User/",{
            username: username,
            role:	role,
            password:password
    })
        .then((userData)=>{
            console.log(userData)
        })
        .catch((err)=>{
            if(err.response.data==="Duplicate username"){
                alert('You already have an account please login');
            }
            console.log(err)
        })
    }
    const goToLogin=()=>{
        navigate("/login");
    }
    
    return(
        <form className="registerForm">
            <h1>Register</h1>
            <label className="form-control">Username</label>
            <input type="text" className="form-control" value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}/>
           <label className="alert alert-danger">{usernameError}</label>
            <label className="form-control">Password</label>
            <input type="password" className="form-control" value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}/>
            <label className="alert alert-danger">{passwordError}</label>
            <label className="form-control">Re-Type Password</label>
            <input type="password" className="form-control" value={repassword}
                    onChange={(e)=>{setrePassword(e.target.value)}}/>
            <label className="form-control">Role</label>
            <select className="form-select" onChange={(e) => { setRole(e.target.value) }}>
                <option value="select">Select Role</option>
                {roles.map((r) =>
                    <option value={r} key={r}>{r}</option>
                )}
            </select>
            <br/>
            <button className="btn btn-primary button" onClick={signUp}>Sign Up</button>
            
            <button className="btn btn-danger button">Cancel</button>
            <br/>
            <hr/>
            <label className="form-control">If you already have an account please login</label>
            <button className="btn btn-login button" onClick={goToLogin}>Login</button>
            
        </form>
    );
}

export default RegisterUser;