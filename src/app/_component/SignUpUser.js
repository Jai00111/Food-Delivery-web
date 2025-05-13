"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function SignUpUser(props){
        let[email,setEmail]=useState("")
        let[password,setPassword]=useState("")
        let[confirmpass,setConfirmPass]=useState("")
        let[username,setusername]=useState("")
        let[address,setAddress]=useState("")
        let[contact,setContact]=useState("")
        let[passerror,setPassError]=useState(false)
        let[error,setError]=useState(false);
        let router= useRouter();

        let searchParams=useSearchParams();
        const order=searchParams.get('order')

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
            setusername("")
            setAddress("")
            setContact("")

            let response=await fetch("http://localhost:3000/api/user",{
                method:"POST",
                body:JSON.stringify({email,password,confirmpass,username,address,contact})

            })
            response=await response.json();
            if (response.success) {
                alert("created user data");

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
            
        }


    return(
        <div className="container">
        <h3> User SignUp</h3>
        <div className="input-wrapper">
            <input className="input-field" type="text" value={username} onChange={(e)=>setusername(e.target.value)} placeholder="ente user-name"></input>
            {
            error && !username && <span className="error-msg">please fill the restaurant Name first!</span>
        }</div>

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