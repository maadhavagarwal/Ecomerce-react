import React from "react";
import "./popular.css"
//import data from "../Assets/data"
import Item from "../Item/item"
import { useEffect } from "react";
import { useState } from "react";

const Popular =()=>{
    const [data,setData]=useState({})
    useEffect(()=>{
fetch('http://localhost:4000/popularinwomen').then((response)=>response.json()).then((data)=>setData(data))
    },[])
    return(
        <div className="popular">
<h1>Popluar in Womens</h1>
<hr></hr>
<div className="popular-item">
    {Array.isArray(data)&&data.map((item,i)=>{
return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
})}
</div>
        </div>
    )
}
export default Popular;