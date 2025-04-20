"use client"
import RestaurantSignin from "../_component/RestaurantSignin";
import RestaurantLogin from "../_component/RestaurantLogin";
import { useState } from "react";
import RestaurantHeader from "../_component/RestaurantHeader";
import "./style.css"
import RestaurantFooter from "../_component/RestaurantFooter";
export default function Restaurant() {
    let [login, setLogin] = useState(true);
    return (
        <div className="container">
            <RestaurantHeader/>
            <h1>Restaurant Login/SignUp page</h1>
            {
                login ? <RestaurantLogin /> : <RestaurantSignin />
            }


            <button className="button-link" onClick={() => setLogin(!login)}>
                {
                    login ? "Do not have account? SignUp" : "Already have Account? Login"
                }</button>
                <RestaurantFooter/>
        </div>
    )
}