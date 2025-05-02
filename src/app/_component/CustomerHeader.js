
import Link from "next/link"
import { useEffect, useState } from "react"
// export default function CustomerHeader(props) {

    // const cartStorage= JSON.parse(localStorage.getItem("cart"));
    // let [cartNum, setCartNum] = useState(cartStorage?.length);
    // let [cartItem, setCartItem] = useState(cartStorage);

    // useEffect(() => {
    //     if (props.cartData) {
    //         if (cartNum) {
    //                 let localCartItem=cartItem;
    //                 localCartItem.push(JSON.parse(JSON.stringify(props.cartData)))
    //                 setCartItem(localCartItem)
    //                 setCartNum(cartNum+1);
    //                 localStorage.setItem('cart',JSON.stringify(localCartItem))
    //         }
    //         else {
    //             setCartNum(1);
    //             setCartItem([props.cartData]);
    //             localStorage.setItem("cart",JSON.stringify([props.cartData]))
    //         }
            
    //     }

    // }, [props.cartData])


export default function CustomerHeader(props) {
    let [cartNum, setCartNum] = useState(0);
    let [cartItem, setCartItem] = useState([]);
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItem(cartStorage);
        setCartNum(cartStorage.length);
      }
    }, []);
  
    useEffect(() => {
      if (props.cartData) {
        if (cartNum > 0) {
            if(cartItem[0].restro_id!==props.cartData.restro_id)
            {
                localStorage.clear("cart");
                setCartNum(1);
                setCartItem([props.cartData]);
                localStorage.setItem("cart", JSON.stringify([props.cartData]));
            }
            else{
                let localCartItem = [...cartItem];
          localCartItem.push(props.cartData);
          setCartItem(localCartItem);
          setCartNum(localCartItem.length);
          localStorage.setItem('cart', JSON.stringify(localCartItem));
            }
          
        } else {
          setCartNum(1);
          setCartItem([props.cartData]);
          localStorage.setItem("cart", JSON.stringify([props.cartData]));
        }
      }
    }, [props.cartData]);

    
    return (
        <div className="header-wrapper">
            <div className="logo">
                <img style={{ width: 150, height: 80 }} alt="DeliveryLogo" src="https://img.freepik.com/free-vector/delivery-service-illustrated_23-2148505081.jpg?t=st=1745237526~exp=1745241126~hmac=1f3bc49d12a15b021be268e530d29c1e8c3701dffc24c88a2c96b01fc4bfc229&w=900"></img>
            </div>
            <ul>
                <li>
                    <Link href="/">Login</Link>
                </li>
                <li>
                    <Link href="/">SignUp</Link>
                </li>
                <li>
                    <Link href="/">Cart({cartNum?cartNum:0})</Link>
                </li>
                <li>
                    <Link href="/">Add Restaurant</Link>
                </li>

            </ul>
        </div>
    )
}