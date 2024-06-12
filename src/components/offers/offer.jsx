import React from "react";
import './offers.css'
import excul from '../Assets/exclusive_image.png'
const Offer =()=>{
    return(
        <div className="offers">
<div className="offers-left">
    <h1>Exculsive</h1>
    <h1>Offers for you</h1>
   
    <button>Check out</button>
</div>
<div className="offers-right">

<img src={excul} alt=""/>
</div>
        </div>
    )
}
export default Offer;