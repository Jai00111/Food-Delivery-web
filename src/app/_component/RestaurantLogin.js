export default function RestaurantLogin(){
    return (
        <>
        <h3>Login Component</h3>
        <div  className="input-wrapper">
            <input className="input-field" type="text" placeholder="enter your email id:"></input>
        </div>
        <div className="input-wrapper">
            <input className="input-field" type="password" placeholder="enter your password id:"></input>
        </div>
        <button  className="input-wrapper">LogIn</button><br></br>
        </>
    )
}