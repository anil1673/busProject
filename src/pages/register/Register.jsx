import axios from 'axios';
import React, { useState } from 'react';
import "./Register.css"
import {useFormik} from "formik";
import { registerFormValidation } from '../../validation/validation';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
const LINK=process.env.REACT_APP_LINK;
console.log(LINK);


const pic=new FormData();
const regsiterFormData=new FormData();



const registerData={name:"",email:"",picturePath:"",password:"",location:"",position:"",phone:""};

const Register = () => {

    const {errors,values,handleBlur,handleChange,handleSubmit,setFieldValue}=useFormik({
        initialValues:registerData,
        validationSchema:registerFormValidation,
        onSubmit:async(values,errors)=>{
            
            const {picturePath}=values;
            pic.append("file",values.picturePath);
            pic.append("upload_preset","talkkish");
            pic.append("cloud_name","dancvkguq");

            fetch("https://api.cloudinary.com/v1_1/dancvkguq/image/upload",{
              method:"POST",
              body:pic
            }).then((res)=>res.json()).then(async(data)=>{
              regsiterFormData.append("name",values.name);
              regsiterFormData.append("email",values.email);
              regsiterFormData.append("password",values.password);
              regsiterFormData.append("location",values.location);
              regsiterFormData.append("imgUrl",data.url);
              regsiterFormData.append("phone",values.phone);
              regsiterFormData.append("position",values.position)
              console.log(regsiterFormData)

             
                await axios.post( `${LINK}/auth/register`,regsiterFormData).then((res)=>{
                  console.log(res.data);
                  navigate("/login")
                }).catch((error)=>{
                  console.log("register error",error)
                })
            
                console.log(data.url)
              
            }).catch((error)=>{
              console.log(error);
            });  
        }
    })


    const navigate=useNavigate();

    

     
  return (
    <div className="registerContainer">
        <form className="registerBox" onSubmit={handleSubmit} encType="multipart/form-data" >
           
           <div className='2div'>
            <div>
              <input type="text" placeholder='first name' name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
              <p>{errors.name}</p>
            </div>
          </div> 
            

            
        <div className='2div'>
          <div>
            <input type="text" placeholder='email' name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
            <p>{errors.email}</p>
          </div>
        </div>

        <div className='2div'>
          <div>
            <input type="password" placeholder='password' name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
            <p>{errors.password}</p>
          </div>
        </div>
        
        <div className='2div'>
          <div>
            <input type="text"placeholder='location' name="location" value={values.location} onChange={handleChange} onBlur={handleBlur} />
            <p>{errors.location}</p>
          </div>
        </div>

        <div className='2div'>
          <div>
            <input type="text"placeholder='phone' name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} />
            <p>{errors.phone}</p>
          </div>
        </div>


        <div className='2div'>  
          <div>
           
            <label htmlFor="picturePath" className='photoLabel'> Photo</label>
            <input id='picturePath' type="file"placeholder='Profile picture' accept=".jpg, .png, .jpeg" name="picturePath"  onChange={(e)=>setFieldValue("picturePath", e.target.files[0])} onBlur={handleBlur}/>
            
            <p>{errors.picturePath}</p>
          </div>
            
            
        </div>


        <div className='2div'>
          <div>
            <label for="position">Bus Owner</label>
            
            <input type="radio" id ="position" placeholder='position' name="position" value="busowner" onChange={handleChange} onBlur={handleBlur} />
          </div>
          <div>
            
            <label for="position">Passenger</label>
            <input type="radio" id ="position" placeholder='position' name="position" value="passenger" onChange={handleChange} onBlur={handleBlur} />
            
          </div>
          <p>{errors.position}</p>

        </div>

        <hr />
            
            <input type='submit' value="Register" className='registerButton'/>
            <div className='pageChange'>
                <span><b>Already have an account?  
                    <NavLink to="/login"> Login</NavLink>
                    </b></span>
            </div>
        </form>
    </div>
  )
}

export default Register