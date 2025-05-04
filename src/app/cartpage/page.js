"use client"
import { DELIVERY_CHARGES, Tax } from "../lib/constant";
import { useEffect, useState } from "react";
import CustomerHeader from "../_component/CustomerHeader";

export default function CartPage() {
    let [cartStorage, setCartStorage] = useState([]);
    let [total, setTotal] = useState(0);

    useEffect(() => {
        let localData = JSON.parse(localStorage.getItem('cart'))
        setCartStorage(localData);
    }, [])

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


    function handleRemove(id) {
        setCartStorage(cartStorage.filter((item) => item._id !== id));
        setCartStorage();
    }


    return (
        <>
            <CustomerHeader />
            {
                cartStorage.length > 0 ? cartStorage.map((item, idx) => (
                    <div key={idx} className="food-details-wrapper" >
                        <div className="cart1">
                            <img src={item.img_path} alt="" height="200px" width="200px"></img></div>

                        <div className="cart2">
                            <strong>{item.name}</strong>

                            <p>{item.description}</p>
                            {
                                <button onClick={() => handleRemove(item._id)}>Remove from cart</button>

                            }

                        </div>
                        <div className="cart3"><strong>Price:{item.price}</strong></div>
                    </div>
                ))
                    : <h1>no item for this restaurant</h1>
            }
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
                <div className="order-button">
                    <button>Order Now</button>
                </div>
            </div>

        </>
    )
}