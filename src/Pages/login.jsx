import React from "react";
import './css/login.css'
import {Link} from 'react-router-dom'
import { useState } from "react";
const Login =()=>{
    const [state,setState]=useState("Login");
    const [formData,setFormData]=useState({
        username:"",
        password:"",
        email:""
    })
    const Changehandler=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})

    }
    const Loginfunction =async()=>{
console.log("Login",formData);
let responseData;
const response= await fetch('http://localhost:4000/login',{
            method:"POST",
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData),
        })
        const jsonData = await response.json();
        console.log(jsonData);
            if (!jsonData.success) {
              alert(jsonData.error); // Corrected typo here
            } else {
              localStorage.setItem('auth-token', jsonData.token);
              localStorage.setItem('name', jsonData.name);
              localStorage.setItem('success', jsonData.success);
              //localStorage.setItem("isAdmin", jsonData.isAdmin);   
              window.location.replace("/");     
              
            }   
}

    
    const Signupfunction =async()=>{
        console.log("signup",formData);
        let responseData;
       const response= await fetch('http://localhost:4000/signup',{
            method:"POST",
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData),
        })
        const jsonData = await response.json();
        console.log(jsonData);
            if (!jsonData.success) {
              alert(jsonData.error); // Corrected typo here
            } else {
              localStorage.setItem("auth-token", jsonData.token);
              localStorage.setItem("name", jsonData.name);
              localStorage.setItem("success", jsonData.success);
              //localStorage.setItem("isAdmin", jsonData.isAdmin);   
              window.location.replace("/");
              
            }
        }
      

    


    return(
        <div className='loginSignup'>
            <div className="loginSignup-contanier">
                <h1>{state}</h1>
                <div className="loginSignup-fields">
{state==="Signup"?<input  name='username' value={formData.username} onChange={Changehandler}type="text" palceholder='your Name'/>:<></>}
<input name="email" value={formData.email} onChange={Changehandler}type="Email" palceholder='your Email'/>
<input name="password" type="Password"value={formData.password} onChange={Changehandler}palceholder='your Password'/>

<button onClick={()=>{state ==="Login"?Loginfunction():Signupfunction()}}>Continue</button>
{state==="Signup"?<p className="loginSignup-login">Already have account?<span onClick={()=>{setState("Login")}}> login here</span></p>
:<p className="loginSignup-login">Create a account<span onClick={()=>{setState("Signup")}}> click here</span></p>
}

<div className="loginsignup-agree">
<input type="checkbox"  name='' id=''/>
<p>By continuing u agree to term of use of privacy policiy</p>

</div>
                </div>
            </div>

        </div>
    )
}
export default Login;