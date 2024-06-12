import React, { useContext } from "react";
import './css/Shopc.css'
import { ShopContext } from "../context/shopcontent";
import drop from '../components/Assets/dropdown_icon.png'
import Item from "../components/Item/item";
//import all_product from "../components/Assets/all_product";
import { useParams } from "react-router-dom";

const ShopCategory =(props)=>{
    const { all_product } = useContext(ShopContext);
   
   
    return(
        <div className="shop-category">
<img className="Shopcategory-banner" src={props.banner} alt=""/>
<div className="shopcategory-indexSort">
    <p><span>Showing 1-12 </span>out of 36</p>
    <div className="shopcategory-sort">
       Sort by <img src={drop} alt=""/>
       
        </div>
    
    </div>
<div className="shopcategory-products">
    {Array.isArray(all_product) && all_product.map((item,i) => {
        if(props.category===item.category){
return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        }
        else{
            return null;
        }
    })}
</div>
        </div>
    )
}
export default ShopCategory;