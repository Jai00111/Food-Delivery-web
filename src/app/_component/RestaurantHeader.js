"use client"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react"


export default function RestaurantHeader(){
    let[detail,setDetail]=useState()
    let router=useRouter();
    let pathname=usePathname();

    useEffect(()=>{
        let data=localStorage.getItem("restaurantUser");
        if(!data && pathname=="/restaurant/dashboard"){
            router.push("/restaurant")
        }
        else if(data && pathname=="/restaurant"){
            router.push("/restaurant/dashboard")
        }
        else{
            setDetail(JSON.parse(data))
        }
    },[])


    function handleLogout(){
        localStorage.clear("restaurantUser");
        router.push("/restaurant");
    }
    return (
        <div className="header-wrapper">
        <div className="logo">
            <img style={{width:150, height:80}} alt="DeliveryLogo" src="https://img.freepik.com/free-vector/delivery-service-illustrated_23-2148505081.jpg?t=st=1745237526~exp=1745241126~hmac=1f3bc49d12a15b021be268e530d29c1e8c3701dffc24c88a2c96b01fc4bfc229&w=900"></img>
        </div>
        <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            {
                detail && detail.restaurantName?
                <>
                <li><Link href="/">Profile</Link> </li>
                <li><button onClick={handleLogout}>Logout</button> </li></>:
                <li>  <Link href="/">LogIn/SignUp</Link>  </li>
            }
            
            
        </ul>
        </div>
    )
}