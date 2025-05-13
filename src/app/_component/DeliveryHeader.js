import Link from "next/link";

export default function DeliveryHeader(){
    return (
        <div className="header-wrapper">
        <div className="logo">
                <img style={{ width: 150, height: 80 }} alt="DeliveryLogo" src="https://img.freepik.com/free-vector/delivery-service-illustrated_23-2148505081.jpg?t=st=1745237526~exp=1745241126~hmac=1f3bc49d12a15b021be268e530d29c1e8c3701dffc24c88a2c96b01fc4bfc229&w=900"></img>
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
            </ul>
        </div>
    )
}