
import { useEffect ,useState} from "react";

export default function FoodItemsList(){
    const [foodItems, setFoodItems]=useState();
    useEffect(()=>{
        LoadFoodItem();
    },[])


    async function LoadFoodItem(){
        let restorantData=JSON.parse(localStorage.getItem("restaurantUser"))
        let restaurantId=restorantData._id;
        console.log(restorantData)
        let response= await fetch("http://localhost:3000/api/restaurant/foods/"+restaurantId)
        response=await response.json();
        if(response.success){
            setFoodItems(response.result)
        }
        else{
            alert("food item list not load")
        }
    }


    async function handleDelete(id){
       let response=await fetch("http://localhost:3000/api/restaurant/foods/"+id,{
        method:"DELETE"
       })
       response=await response.json();
       if(response.success){
        LoadFoodItem();
       }
       else{
        alert("food item not deleted")
       }
    }

    return(
        <div className="container">
        <h1>Food item</h1>
        <table border="1">
            <thead><tr>
            <td>Items Name</td>
            <td>Items Price</td>
            <td>Items Image</td>
            <td>Items description</td>
            <td>Operation</td>
            </tr></thead>
            <tbody>
                {
                foodItems && foodItems.map((item,idx)=>{
                return(
                 <tr key={idx}><td>{item.name}</td>
                 <td>{item.price}</td>
                 <td><img src={item.img_path} alt=""/></td>
                 <td>{item.description}</td>
                 <td><button onClick={()=>handleDelete(item._id)}>Delete</button><button>Edit</button></td>
                </tr>)
                })}
            </tbody>
        </table>
    </div>
    )
}
