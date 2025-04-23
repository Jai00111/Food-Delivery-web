"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function RestaurantLogin(){
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let [error, setError]=useState(false)
    let router= useRouter()
    async function handleClick(){
        if(!email || !password){
            setError(true)
            return false
        }
        else{
            setError(false)
        }

        let data= await fetch("http://localhost:3000/api/restaurant",{
            method:"POST",
            body:JSON.stringify({email, password , login:true})
        });
       let response= await data.json();
        // if(response.success){
        //     const {result}=response;
        //     delete result.password;
        //     localStorage.setItem("restaurantUser",JSON.stringify(result))
        //     router.push("/restaurant/dashboard")
        //     alert("login success")
        // }
        // else{
        //     alert("login failed")
        // }
        if (response.success) {
            const { result } = response;
            if (result) {
              delete result.password;
              localStorage.setItem("restaurantUser", JSON.stringify(result));
              router.push("/restaurant/dashboard");
              alert("login success");
            } else {
              alert("Invalid response from server");
            }
          } else {
            alert("login failed");
          }
          

        setEmail("");
        setPassword("")
    }
    
    
    return (
        <>
        <h3>Login Component</h3>
        <div  className="input-wrapper">
            <input className="input-field" onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="enter your email id:"></input>
               {error && !email && <span className="error-msg">empty email filed!</span>}
        </div>
        <div className="input-wrapper">
            <input className="input-field"  onChange={(e)=>setPassword(e.target.value)} type="password" value={password} placeholder="enter your password id:"></input>
            {error && !password && <span className="error-msg">empty password filed!</span>}
            </div>
        <button  className="input-wrapper" onClick={handleClick}>LogIn</button><br></br>
        </>
    )
}