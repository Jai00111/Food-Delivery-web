"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import DeliveryHeader from "../_component/DeliveryHeader"

export default function UserLogin(props) {
    let [loginMobile, setLoginMobile] = useState("")
    let [loginpassword, setLoginPassword] = useState("")

    let [confirmpass, setConfirmPass] = useState("")
    let [username, setusername] = useState("")
    let [address, setAddress] = useState("")
    let [mobile, setMobile] = useState("");
    let [password, setPassword] = useState("")
    let router = useRouter()

    const searchParams = useSearchParams();
    const order = searchParams.get('order')


    useEffect(()=>{
        if(localStorage.getItem("delivery")){
            router.push("deliverydashboard")
        }
    },[])


    async function handleClick() {
        let response = await fetch("http://localhost:3000/api/deliverypartners/signup", {
            method: "POST",
            body: JSON.stringify({ username, mobile, password, address, confirmpass })
        })
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem("delivery", JSON.stringify(result));
            alert("success!")
        }
        else {
            alert("failed!")
        }

    }



    async function loginhandle() {
        let response = await fetch("http://localhost:3000/api/deliverypartners/login", {
            method: "POST",
            body: JSON.stringify({ loginMobile: loginMobile, loginPassword: loginpassword })
        })
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem("delivery", JSON.stringify(result))
            router.push("/deliverydashboard")
        } else {
            alert("failed to login, please try again with the valid mobile and password")
        }
    }
    return (
        <div>
            <DeliveryHeader/>
       
        <div className="auth-container">
            
            <div className="login-wrapper">
                <h3>LogIn</h3>
                <div className="input-wrapper">
                    <input className="input-field" onChange={(e) => setLoginMobile(e.target.value)} value={loginMobile} type="text" placeholder="enter your mobile:"></input>
                    {/* {error && loginMobile && <span className="error-msg">empty email filed!</span>} */}
                </div>
                <div className="input-wrapper">
                    <input className="input-field" onChange={(e) => setLoginPassword(e.target.value)} type="password" value={loginpassword} placeholder="enter your password id:"></input>
                    {/* {error && !password && <span className="error-msg">empty password filed!</span>} */}
                </div>
                <button className="input-wrapper" onClick={loginhandle} >LogIn</button><br></br>
            </div>

            <div className="signup-wrapper">

                <h3>SignUp</h3>
                <div className="input-wrapper">
                    <input className="input-field" type="text" value={username} onChange={(e) => setusername(e.target.value)} placeholder="ente user-name"></input>
                    {/* {
                        error && !username && <span className="error-msg">please fill the restaurant Name first!</span>
                    }</div> */}

                    <div className="input-wrapper">
                        <input className="input-field" type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="enter your mobile:"></input>
                        {/* {
                        error && !email && <span className="error-msg">please fill the email first!</span>
                    } */}
                    </div>


                    <div className="input-wrapper">
                        <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="enter your password :"></input>
                        {/* {
                        error && !password && <span className="error-msg">please fill the password first!</span>
                    } */}
                    </div>


                    <div className="input-wrapper">
                        <input className="input-field" type="password" value={confirmpass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="confirm password"></input>
                        {/* {
                        passerror && <span className="error-msg">Passwords do no match!</span>
                    }
                    {
                        error && !confirmpass && <span className="error-msg">please fill the confirm password first!</span>
                    } */}
                    </div>





                    <div className="input-wrapper">
                        <input className="input-field" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="enter your full address "></input>
                        {/* {
                        error && !address && <span className="error-msg">please fill the address first!</span>
                    }</div> */}

                    </div>
                    <button className="input-wrapper" onClick={handleClick}>SignUp</button><br></br>

                </div>
            </div>
        </div>
         </div>
    )
}