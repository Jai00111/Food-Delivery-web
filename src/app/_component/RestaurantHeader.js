
import Link from "next/link"
export default function RestaurantHeader(){
    return (
        <div className="header-wrapper">
        <div className="logo">
            <img style={{width:100}} alt="DeliveryLogo" src="./foodDelivery.png"></img>
        </div>
        <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/">LogIn/SignUp</Link>
            </li>
            <li>
                <Link href="/">Profile</Link>
            </li>
        </ul>
        </div>
    )
}