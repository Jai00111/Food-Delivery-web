"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "../_component/CustomerHeader";
import RestaurantFooter from "../_component/RestaurantFooter";
import {v4 as uuidv4} from 'uuid'

export default function Myprofile() {
    let [myOrder, setMyOrder] = useState();

    useEffect(() => {
        getMyOrder()
    }, [])
    async function getMyOrder() {
        let userStorage=JSON.parse(localStorage.getItem("user"))
        let response = await fetch("http://localhost:3000/api/order?id="+userStorage._id)
        response = await response.json();
        if (response.success) {
            setMyOrder(response.result);
        }
    }
    const id=uuidv4()
    return (
        <>
            <CustomerHeader />
            <div className="restro-details" >
                {
                    myOrder && myOrder.map((item,idx) => (
                        <div className="restro-box"  key={idx}>
                        <div><strong>{item.data.restaurantName}</strong></div>
                         <div>{item.data.email}</div>
                          <div>{item.data.address}</div>
                           <div>{item.data.contact}</div>
                         </div>
                    ))
                }
            </div>

            <RestaurantFooter />
        </>
    )
}