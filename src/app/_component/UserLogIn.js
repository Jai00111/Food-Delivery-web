"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function UserLogin(props){
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let [error, setError]=useState(false)
    let router= useRouter()

    const searchParams=useSearchParams();
    const order=searchParams.get('order')

    async function handleClick(){
        if(!email || !password){
            setError(true)
            return false
        }
        else{
            setError(false)
        }

        let response=await fetch("http://localhost:3000/api/user",{
            method:"POST",
            body:JSON.stringify({email,password,login:true})
        })
        response=await response.json();
        if (response.success) {
            alert("login success");

            let result = response.result;

            if (result && result.password) {
              delete result.password;
            }
            localStorage.setItem("user", JSON.stringify(result));
            if(order){
                router.push("/order");
            }
            else{
                router.push("/")
            }
           
          } else {
            alert("something wrong");
          }

        setEmail("");
        setPassword("")
    }
    
    
    return (
        <div className="container">
        <h3>UserLogIn</h3>
        <div  className="input-wrapper">
            <input className="input-field" onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="enter your email id:"></input>
               {error && !email && <span className="error-msg">empty email filed!</span>}
        </div>
        <div className="input-wrapper">
            <input className="input-field"  onChange={(e)=>setPassword(e.target.value)} type="password" value={password} placeholder="enter your password id:"></input>
            {error && !password && <span className="error-msg">empty password filed!</span>}
            </div>
        <button  className="input-wrapper" onClick={handleClick}>LogIn</button><br></br>
        </div>
    )
}