import { useState } from "react"
export default function AddFood({setAddItems}) {
    
    let [item, setItem] = useState("")
    let [price, setPrice] = useState("")
    let [image, setImage] = useState("")
    let [description, setDescription] = useState("")
    let [error, setError]=useState(false)

    async function handleClick() {
        
        if(!item || !price|| !image || !description){
            setError(true);
            return false
        }
        let restro_id;
        const restrodata = JSON.parse(localStorage.getItem("restaurantUser"));
        if (restrodata) {
            restro_id = restrodata._id;
        }
        let data = await fetch("http://localhost:3000/api/restaurant/foods", {
            method: "POST",
            body: JSON.stringify({ name:item, price, img_path: image, description, restro_id })
        })
        let response = await data.json();
        console.log(response);
        if(response.success){
            alert("food items is added")
            setAddItems(false);
        }
        else{
            alert("food item not added")
        }
        setItem("")
        setImage("")
        setPrice("")
        setDescription("")
    }

    return (
        <div className="container">
            <h1>Add Food Items</h1>
            <div className="input-wrapper">
                <input className="input-field" placeholder="enter your item" onChange={(e) => setItem(e.target.value)} value={item}></input>
                {error && !item && <span className="error-msg">please fill the item name !</span>}</div>
            <div className="input-wrapper"><input className="input-field" placeholder="enter your item price" onChange={(e) => setPrice(e.target.value)} value={price}></input>
            {error && !price && <span className="error-msg">please fill the item price !</span>}</div>
            <div className="input-wrapper"><input className="input-field" placeholder="enter your item image" onChange={(e) => setImage(e.target.value)} value={image}></input>
            {error && !image && <span className="error-msg">please fill the item image !</span>}</div>
            <div className="input-wrapper"><input className="input-field" placeholder="enter your item description" onChange={(e) => setDescription(e.target.value)} value={description}></input>
            {error && !description && <span className="error-msg">please fill the item description !</span>}</div>
            <div className="input-wrapper"><button onClick={handleClick}> Add Item</button></div>

        </div>
    )
}