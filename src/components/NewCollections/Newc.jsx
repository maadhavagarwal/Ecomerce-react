import React from "react";
import './Newc.css'
//import new_collection from '../Assets/new_collections'
import Item from "../Item/item";
import { useState } from "react";
import { useEffect } from "react";
const Newc =()=>{
    const [new_collection,setNew_collection]=useState({})
    useEffect(()=>{
fetch('http://localhost:4000/newcollection').then((response)=>response.json()).then((data)=>setNew_collection(data))
    },[])
    return(
        <div className="new-collections">
<h1>New Collects</h1>
<hr/>
<div className="collections">
{Array.isArray(new_collection)&& new_collection.map((item,i)=>{
return<Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>

})}
</div>
        </div>
    )
}
export default Newc;