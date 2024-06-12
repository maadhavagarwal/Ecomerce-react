import React from "react";
import './Newssletter.css'
const NewsLetter =()=>{
    return(
        <div className="news-letter">
<h1>Get Exculsive</h1>
<p>Subscribe to our newsletter</p>
<div>
    <input type="email" placeholder="Your Email id"/>
    <button>Subscribe</button>
</div>
        </div>
    )
}
export default NewsLetter;