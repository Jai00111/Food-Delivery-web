"use client"
import { useState } from "react";
import AddFood from "@/app/_component/AddFood";
import "./../style.css"
import RestaurantHeader from "@/app/_component/RestaurantHeader";
import FoodItemsList from "@/app/_component/FoodItemsList";

export default function Dashboard() {
    let [addItems, setAddItems]=useState(false)
    return (
        <>
       
        <RestaurantHeader/>
           
        <button onClick={()=>setAddItems(true)}>Add Food</button>
        <button onClick={()=>setAddItems(false)}>Dashboard</button>
            {addItems?<AddFood setAddItems={setAddItems}/>: <FoodItemsList/>}
        </>

    )
}