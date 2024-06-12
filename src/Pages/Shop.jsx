import React from "react";
import Hero from "../components/Hero/Hero";
import Popular from "../components/popular/popular"
import Offer from "../components/offers/offer";
import Newc from "../components/NewCollections/Newc";
import NewsLetter from "../components/Newsletter/Newsletter";
const Shop =()=>{
    return(
        <div>
<Hero/>
<Popular/>
<Offer/>
<Newc/>
<NewsLetter/>
        </div>
    )
}
export default Shop;