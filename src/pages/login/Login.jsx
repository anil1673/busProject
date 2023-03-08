import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {Link, NavLink,useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux"
import {useFormik} from "formik"
import { loginFormValidation } from '../../validation/validation';
import {setLogin} from "../../redux/index.js"
// import loginImg from "../../components/Images/loginImg.png"
require("./Login.css");
const LINK=process.env.REACT_APP_LINK;

const loginData={email:"",password:""};




const Login = () => {
    
    const loginFormData=new FormData();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [passWrong,setPassWrong]=useState(false);
    const [emailWrong,setEmailWrong]=useState(false);


    const {errors,values,handleChange,handleSubmit,handleBlur}=useFormik({
        initialValues:loginFormData,
        validationSchema:loginFormValidation,
        onSubmit:async(values,errors)=>{
            loginFormData.append("email",values.email);
            loginFormData.append("password",values.password);

            await axios.post(`${LINK}/auth/login`,loginFormData).then((res)=>{
                console.log("login success");
                console.log(res.data)
                dispatch(setLogin({
                    user:res.data.user,
                    token:res.data.token
                }));
                navigate("/")
                // localStorage.setItem("user",JSON.stringify(res.data.user))

            }).catch((error)=>{
                console.log("login error",error);
            })


        }
    })
    
    

   

   

  return (
    <div className="loginContainer">
        {/* <div className="info">
        <h1>Talkishh</h1>
        <h4>Stay Connected With Virtual World.</h4>
        <img src={loginImg} alt="" />
      </div> */}
        <form className="loginBox" onSubmit={handleSubmit}>
            <div className="emailField">
                <input type="text"placeholder='email' name="email" value={values.email} onChange={handleChange} onClick={()=>setEmailWrong(false)}/>
                {emailWrong && <p>* Email doesnot exist</p>}
                <p>{errors.email}</p>
            </div>

            <div className="passField">
                <input type="text" placeholder='password' name="password" value={values.password} onChange={handleChange} onClick={()=>setPassWrong(false)}/>
                {passWrong && <p>* Password is Worng</p>}
                <p>{errors.password}</p>
            </div>

            <hr />

            <div>
                <input type='submit' value="Login" className='loginSubmit'/>
                <p style={{textAlign:"center",cursor:"pointer",marginTop:"10px"}}><b>Forget Password?</b></p>
            </div>
            <div className='pageChange'>
                <span><b>Don't have an account?  
                    <NavLink to="/register"> Register</NavLink>
                    </b></span>
            </div>
        </form>
    </div>
  )
}

export default Login