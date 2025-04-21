"use client"
import { useState } from "react"

export default function RestaurantSignin(){
    let[email,setEmail]=useState("")
    let[password,setPassword]=useState("")
    let[confirmpass,setConfirmPass]=useState("")
    let[restaurantName,setRestaurantName]=useState("")
    let[address,setAddress]=useState("")
    let[contact,setContact]=useState("")

    async function handleClick(){
        console.log(email)
        console.log(password)
        console.log(confirmpass)
        console.log(restaurantName)
        console.log(address)
        console.log(contact)
        setEmail("")
        setPassword("")
        setConfirmPass("")
        setRestaurantName("")
        setAddress("")
        setContact("")

        let data=await fetch("http://localhost:3000/api/restaurant",{
            method:"POST",
            body:JSON.stringify({email,password,confirmpass,restaurantName,address,contact})
        })
        let result=await data.json();
        console.log(result)
        if(result.success){
            alert("data has created")
        }
    }
    
    return (
        <div className="container">
        <h3>SignUp Component</h3>
        <div  className="input-wrapper">
            <input className="input-field" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email id:"></input>
        </div>
        <div className="input-wrapper">
            <input className="input-field" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="enter your password id:"></input>
        </div>
        <div className="input-wrapper">
            <input className="input-field" type="password" value={confirmpass} onChange={(e)=>setConfirmPass(e.target.value)} placeholder="confirm password"></input>
        </div>
        <div className="input-wrapper">
            <input className="input-field" type="text" value={restaurantName} onChange={(e)=>setRestaurantName(e.target.value)} placeholder="enter restaurant name"></input>
        </div>
        <div className="input-wrapper">
            <input className="input-field" type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="enter your full address "></input>
        </div>
        <div className="input-wrapper">
            <input className="input-field" type="text" value={contact} onChange={(e)=>setContact(e.target.value)} placeholder="enter your contact no"></input>
        </div>
        <button  className="input-wrapper" onClick={handleClick}>SignUp</button><br></br>
        </div>
    )
}