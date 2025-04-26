"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import "../../../restaurant/style.css"
export default function EditFood() {
    let router = useRouter();
    const params = useParams();
    let [item, setItem] = useState("")
    let [price, setPrice] = useState("")
    let [image, setImage] = useState("")
    let [description, setDescription] = useState("")
    let [error, setError] = useState(false)


    useEffect(() => {
        handleLoadFoodItem();
    }, [])
    async function handleLoadFoodItem() {
        let data = await fetch("http://localhost:3000/api/restaurant/foods/edit/" + params.id)
        data = await data.json()
        if (data.success) {
            setItem(data.result.name)
            setDescription(data.result.description)
            setImage(data.result.img_path)
            setPrice(data.result.price)
        }
    }
    async function handleClick() {
        let data = await fetch("http://localhost:3000/api/restaurant/foods/edit/" + params.id, {
            method: "PUT",
            body: JSON.stringify({name:item, price, img_path: image, description })
        })
        let response=await data.json();
        if(response.success){
            router.push("/restaurant/dashboard")
        }

        if (!item || !price || !image || !description) {
            setError(true);
            return false
        }
        else {
            setError(false)
        }

    }


    return (
        <div className="container">
            <h1>Edit Food Items</h1>
            <div className="input-wrapper">
                <input className="input-field" placeholder="enter your item" onChange={(e) => setItem(e.target.value)} value={item}></input>
                {error && !item && <span className="error-msg">please fill the item name !</span>}</div>
            <div className="input-wrapper"><input className="input-field" placeholder="enter your item price" onChange={(e) => setPrice(e.target.value)} value={price}></input>
                {error && !price && <span className="error-msg">please fill the item price !</span>}</div>
            <div className="input-wrapper"><input className="input-field" placeholder="enter your item image" onChange={(e) => setImage(e.target.value)} value={image}></input>
                {error && !image && <span className="error-msg">please fill the item image !</span>}</div>
            <div className="input-wrapper"><input className="input-field" placeholder="enter your item description" onChange={(e) => setDescription(e.target.value)} value={description}></input>
                {error && !description && <span className="error-msg">please fill the item description !</span>}</div>
            <div className="input-wrapper"><button onClick={handleClick}> Edit Item</button></div>


        </div>
    )
}