"use client"
import Image from "next/image";
import styles from "./page.module.css";

import CustomerHeader from "./_component/CustomerHeader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  let [location, setLocation] = useState([])
  let [selectedLoc, setSelectedLoc] = useState('')
  let [showlocation, setShowlocation] = useState(false);
  let [restaurants, setRestaurant] = useState()
  let router= useRouter()

  useEffect(() => {
    loadLocation();
    loadRestaurant();
  }, [])

  async function loadLocation() {
    let data = await fetch("http://localhost:3000/api/customer/location")
    data = await data.json();
    if (data.success) {
      setLocation(data.result);
    }
  }

  function handleLocation(item) {
    setSelectedLoc(item);
    setShowlocation(false);
    loadRestaurant({location:item});
  }

  async function loadRestaurant(params) {
    let url="http://localhost:3000/api/customer";
    if(params?.location){
      url=url+"?location="+params.location
    }else if(params?.restaurant){
      url=url+"?restaurant="+params.restaurant
    }
    let response = await fetch(url)
    response = await response.json();
    if (response.success) {
      setRestaurant(response.result)
    }
  }
  return (
    <>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1 className="font-bold text-teal-500">Food delevery App</h1>
        <div className="search-pannel">
          <input type="text" className="select-input" onClick={
            () => setShowlocation(true)}
             onChange={(e) => setSelectedLoc(e.target.value)}
            value={selectedLoc} placeholder="select place" />

          <ul className="location-list">

            {showlocation && location && location.map((item, idx) => (
              <li key={idx} onClick={() => handleLocation(item)}>
                {item} </li>))}

          </ul>

          <input type="text" className="search-input" placeholder="search food or restraurant name"
          onChange={(e)=>loadRestaurant({restaurant:e.target.value})} />
        </div>

      </div>
      <div className="restro-details">{
        restaurants && restaurants.map((item,idx)=>(
        <div className="restro-box" onClick={()=>router.push("explore/"+item.restaurantName+"?id="+item._id)} key={idx}>
            <h3 >{item.restaurantName?.toUpperCase()}</h3>

            <strong>Location:</strong>{item.address} &nbsp;
            <strong>Email:</strong>{item.email}<br/>
            <strong>Contact:</strong>{item.contact}
        </div>
      ))
}</div>

    </>
  );
}
