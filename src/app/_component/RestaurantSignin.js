"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RestaurantSignin(){
    let[email,setEmail]=useState("")
    let[password,setPassword]=useState("")
    let[confirmpass,setConfirmPass]=useState("")
    let[restaurantName,setRestaurantName]=useState("")
    let[address,setAddress]=useState("")
    let[contact,setContact]=useState("")
    let[passerror,setPassError]=useState(false)
    let[error,setError]=useState(false);
    let router= useRouter();

    async function handleClick(){
        if(password!==confirmpass){
            setPassError(true)
            return false
        }
        else{
            setPassError(false)
        }
        if(!email || !password|| !confirmpass || !address || !contact){
            setError(true);
            return false
        }
        else{
            setError(false);
        }
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

        let response=await data.json();
        console.log(response)
        if(response.success){
            const {result}=response
            delete result.password;
            localStorage.setItem("restaurantUser",JSON.stringify(result))
            router.push("/restaurant/dashboard");
            alert("data has created")
        }
        
    }
    
    return (
        <div className="container">
        <h3>SignUp Component</h3>
        <div  className="input-wrapper">
            <input className="input-field" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email id:"></input>
            {
            error && !email && <span className="error-msg">please fill the email first!</span>
        }
        </div>
        

        <div className="input-wrapper">
            <input className="input-field" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="enter your password id:"></input>
            {
            error && !password && <span className="error-msg">please fill the password first!</span>
        }
        </div>
        

        <div className="input-wrapper">
            <input className="input-field" type="password" value={confirmpass} onChange={(e)=>setConfirmPass(e.target.value)} placeholder="confirm password"></input>
            {
            passerror && <span className="error-msg">Passwords do no match!</span>
        }
        {
            error && !confirmpass && <span className="error-msg">please fill the confirm password first!</span>
        }
        </div>
        

        <div className="input-wrapper">
            <input className="input-field" type="text" value={restaurantName} onChange={(e)=>setRestaurantName(e.target.value)} placeholder="enter restaurant name"></input>
            {
            error && !restaurantName && <span className="error-msg">please fill the restaurant Name first!</span>
        }</div>
        

        <div className="input-wrapper">
            <input className="input-field" type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="enter your full address "></input>
            {
            error && !address && <span className="error-msg">please fill the address first!</span>
        }</div>
        

        <div className="input-wrapper">
            <input className="input-field" type="text" value={contact} onChange={(e)=>setContact(e.target.value)} placeholder="enter your contact no"></input>
            {
            error && !contact && <span className="error-msg">please fill the contact number first!</span>
        }
        </div>
        

        <button  className="input-wrapper" onClick={handleClick}>SignUp</button><br></br>
        </div>
    )
}