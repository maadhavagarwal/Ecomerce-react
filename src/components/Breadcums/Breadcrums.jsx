import React from "react";
import './bread.css'
import arrow_icon from '../Assets/arrow.png'
//import all_product from "../Assets/all_product";
const Breadcrum =(props)=>{
    const {product}=props;
    return(
        <>
        {Array.isArray(product) && product.map((item) => {      
        <div className="breadcrum">
     
Home<img src={arrow_icon}alt=''/>Shop<img src={arrow_icon} alt=""/>{item.category} <img src={arrow_icon} alt=""/>{item.name}       
 </div>
        })
    }    
    </>
)

}
export default Breadcrum;