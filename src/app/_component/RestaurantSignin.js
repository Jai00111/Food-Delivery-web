export default function RestaurantSignin(){
    return (
        <div className="container">
        <h3>SignUp Component</h3>
        <div  className="input-wrapper">
            <input className="input-field" type="text" placeholder="enter your email id:"></input>
        </div>
        <div className="input-wrapper">
            <input className="input-field" type="password" placeholder="enter your password id:"></input>
        </div>
        <div className="input-wrapper">
            <input className="input-field" type="password" placeholder="confirm password"></input>
        </div>
        <div className="input-wrapper">
            <input className="input-field" type="text" placeholder="enter restaurant name"></input>
        </div>
        <div className="input-wrapper">
            <input className="input-field" type="text" placeholder="enter your full address "></input>
        </div>
        <div className="input-wrapper">
            <input className="input-field" type="text" placeholder="enter your contact no"></input>
        </div>
        <button  className="input-wrapper">SignUp</button><br></br>
        </div>
    )
}