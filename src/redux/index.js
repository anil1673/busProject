import {createSlice} from "@reduxjs/toolkit";
import { startTransition } from "react";

const initialState={
    mode:"light",
    user:null,
    token:null,
    buses:""
}

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
        },
        setLogout:(state,action)=>{
            state.user=null;
            state.token=null;
        }
    }
})


export const {setLogin,setLogout}=authSlice.actions;
export default authSlice.reducer;