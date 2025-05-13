"use client"
import { DELIVERY_CHARGES, Tax } from "../lib/constant";
import { useEffect, useState } from "react";
import CustomerHeader from "../_component/CustomerHeader";
import { useRouter } from "next/navigation";
export default function CartPage() {
    let [cartStorage, setCartStorage] = useState([]);
    let [total, setTotal] = useState(0);
    let[userdata,setUserData]=useState({})
    let[removeCart,setRemoveCart]=useState(false);

    let router=useRouter();

    useEffect(() => {
        let localData = JSON.parse(localStorage.getItem('cart'))
        setCartStorage(localData);
        let localUserData = JSON.parse(localStorage.getItem('user'))
        setUserData(localUserData);
    }, []);


    useEffect(()=>{
        if(!cartStorage){
            router.push("/");
        }
    },[cartStorage])

    
    useEffect(() => {
        if (cartStorage && cartStorage.length > 0) {
            if (cartStorage.length === 1) {
                setTotal(cartStorage[0].price);
            } else {
                setTotal(cartStorage.reduce((a, b) => a + b.price, 0));
            }
        } else {
            setTotal(0);
        }
    }, [cartStorage]);

    async function handleClick(){
        let user_Id=JSON.parse(localStorage.getItem("user"))._id;
        let cart=JSON.parse(localStorage.getItem("cart"));
        let restro_Id=cart[0].restro_id;
        let foodItem_Id=cart.map((item)=>item._id.toString());
        let deliveryBoy_Id="680c76ba8def7fd7f4e51c12";
        
        let collection={
            user_Id,
            restro_Id,
            foodItem_Id,
            deliveryBoy_Id,
            status:"confirm",
            amount:total+total*Tax/100 +DELIVERY_CHARGES
        }
        let response=await fetch("http://localhost:3000/api/order",{
            method:"POST",
            body:JSON.stringify(collection)
        })
        response=await response.json();
        if(response.success){
            alert("order comfirmed");
            setRemoveCart(true);
            router.push("/my-profile")
        }
        else{
            alert("something error")
        }

    }

    return (
        <>
            <CustomerHeader removeCart={removeCart}/>
            <h1>User Detail:</h1>
                <div className="total-wrapper">
                <div className="bill-div">
                <div className="row">
                        <span>Name:</span>
                        <span>{userdata?.username}</span>
                    </div> 
                    <div className="row">
                        <span>Address:</span>
                        <span>{userdata?.address}</span>
                    </div> 
                    <div className="row">
                        <span>Contact:</span>
                        <span>{userdata?.contact}</span>
                    </div> 
                </div>
                </div>
                <h1>Amount Detail:</h1>
            <div className="total-wrapper">
                
                <div className="bill-div">
                    <div className="row">
                        <span>Food Charges:</span>
                        <span>{total}</span>
                    </div>
                    <div className="row">
                        <span>Tax:</span>
                        <span>{total*Tax/100}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges:</span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amount:</span>
                        <span>{total+total*Tax/100 +DELIVERY_CHARGES}</span>
                    </div>
                </div>
                
            </div>
            <h1>Payment Method:</h1>
            <div className="total-wrapper">
            <div className="row">
                <span>Cash on Delivery:</span>
                <span>{total+total*Tax/100 +DELIVERY_CHARGES}</span>
            </div>
            </div>
          
                    <button style={{backgroundColor:"orange",color:"white",borderRadius:"15px",}} onClick={handleClick}>place your order now</button>
                

        </>
    )
}