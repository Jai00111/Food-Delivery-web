"use client"
import { useEffect, useState } from "react";
import RestaurantFooter from "../_component/RestaurantFooter";
import {v4 as uuidv4} from 'uuid'
import DeliveryHeader from "../_component/DeliveryHeader";

export default function Myprofile() {
    let [myOrder, setMyOrder] = useState();

    useEffect(() => {
        getMyOrder()
    }, [])
    async function getMyOrder() {
        let deliverydata=JSON.parse(localStorage.getItem("delivery"))
    
        let response = await fetch("http://localhost:3000/api/deliverypartners/orders/"+deliverydata._id)
        response = await response.json();
        if (response.success) {
            setMyOrder(response.result);
        }
    }
    const id=uuidv4()
    return (
        <>
            <DeliveryHeader />
            <h1>My-Order List</h1>
            <div className="restro-details" >
                {
                    myOrder && myOrder.map((item,idx) => (
                        <div className="restro-box"  key={idx}>
                        <div><strong>Restraurant Name: {item.data.restaurantName}</strong></div>
                         <div>{item.data.email}</div>
                          <div>{item.data.address}</div>
                           <div>{item.data.contact}</div>
                           <div>
                            <select>
                                <option>Option</option>
                                <option>Delivered</option>
                                <option>On the way</option>
                                <option>Canceled</option>
                                <option>Confirm</option>
                            </select>
                           </div>
                         </div>
                    ))
                }
            </div>

            <RestaurantFooter />
        </>
    )
}