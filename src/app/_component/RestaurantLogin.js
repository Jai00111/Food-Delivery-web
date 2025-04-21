"use client"
import { useState } from "react"

export default function RestaurantLogin(){
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    function handleClick(){
        console.log(email);
        console.log(password);
        setEmail("");
        setPassword("")
    }
    
    return (
        <>
        <h3>Login Component</h3>
        <div  className="input-wrapper">
            <input className="input-field" onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="enter your email id:"></input>
               
        </div>
        <div className="input-wrapper">
            <input className="input-field"  onChange={(e)=>setPassword(e.target.value)} type="password" value={password} placeholder="enter your password id:"></input>
        </div>
        <button  className="input-wrapper" onClick={handleClick}>LogIn</button><br></br>
        </>
    )
}