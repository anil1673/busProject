import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const auth=useSelector((state)=>state.token);
  console.log(auth)
  const navigate=useNavigate();
  useEffect(()=>{
    if(auth){
      console.log(auth)
    }else{
      navigate("/login")
    }
  })
  console.log(auth)
  return (
    <div>Home</div>
  )
}

export default Home