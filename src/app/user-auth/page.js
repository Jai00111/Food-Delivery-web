"use client"
import CustomerHeader from "../_component/CustomerHeader";
import RestaurantFooter from "../_component/RestaurantFooter";
import SignUpUser from "../_component/SignUpUser";
import UserLogin from "../_component/UserLogIn";
import { useState } from "react";
export default function UserAuth(props){
    let[login,setLogin]=useState(true);
return(
    <div className="container">
    <CustomerHeader/>
    {login?<UserLogin redirect={props.searchParams}/>:<SignUpUser redirect={props.searchParams}/>}
    <button onClick={()=>setLogin(!login)} style={{background:"transparant", border:"none", color:"blue", textDecoration:"underline"}}>
        {login?"do you have a account?Sign up":"All ready have a account?LogIn"}
    </button>
    <RestaurantFooter/>
    </div>
)
}