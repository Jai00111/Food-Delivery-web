"use client"
import CustomerHeader from "@/app/_component/CustomerHeader";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

import { use } from 'react'
export default function Page({ params }) {
    const searchParams = useSearchParams();
    let [restodetails, setRestroDetails] = useState('')
    let [foodItems, setFoodItems] = useState([])
    let [cartdata, setCartData] = useState();
    let restroname = use(params).name;
    let [cartItems, setCartItems] = useState([])
    let [cartIds, setCartIds] = useState([])

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, [])

    useEffect(() => {
        if (cartItems.length > 0) {
            setCartIds(cartItems.map((item) => item._id))
        }
    }, [cartItems])


    useEffect(() => {
        loadDetails()
    }, [])

    console.log(cartIds);

    async function loadDetails() {
        const id = searchParams.get("id")
        let response = await fetch("http://localhost:3000/api/customer/" + id)
        response = await response.json();
        if (response.success) {
            setRestroDetails(response.details)
            setFoodItems(response.fooddetails)
        }
    }

    function addToCart(item) {
        setCartData(item);
        cartIds.push(item._id);
        
    }
    return (
        <>
            <CustomerHeader cartData={cartdata} />
            <div className="restaurant-page-banner"><h1 className="main-page-banner">{decodeURI(restroname)}</h1>
                {
                    restodetails && <div className="restrodetail-list" >
                        <strong>Contact:{restodetails.contact}</strong>
                        <strong>Email:{restodetails.email}</strong>
                        <strong>Address:{restodetails.address}</strong>
                    </div>
                }

            </div>
            {foodItems.map((item, idx) => (
                <div key={idx} className="food-details-wrapper" >
                    <div>
                        <img src={item.img_path} alt="" height="200px" width="200px"></img></div>

                    <div className="menu-wrapper">
                        <strong>{item.name}</strong>
                        <p>{item.price}</p>
                        <p>{item.description}</p>
                        {
                            cartIds.includes(item._id)?<button>Remove from cart</button>
                            :<button onClick={() => addToCart(item)}> Add to Cart</button>
                        }
                        
                    </div>
                </div>
            ))
            }

        </>
    )
}
