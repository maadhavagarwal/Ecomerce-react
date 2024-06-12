import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/shopcontent'
const Navbar=()=>{
    const [menu,setMenu]=useState("Shop");
    const {getTotalCartItems}= useContext(ShopContext);
    return(
<div className='navbar'>
    <div className='nav-logo'>
        <img src={logo} alt=''/>
        <p>Shooper</p>
    </div>
    <ul className="nav-menu">
        <li onClick={()=>{setMenu("Shop")}}><Link style={{textDecoration:'none'}} to="/">Shop</Link>{menu==="Shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("Men")}}><Link style={{textDecoration:'none'}} to="/Mens">Mens</Link>{menu==="Men"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("Women")}}><Link style={{textDecoration:'none'}}  to="/Womens">Women</Link>{menu==="Women"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("Kids")}}><Link style={{textDecoration:'none'}} to="/kids">Kids</Link>{menu==="Kids"?<h/>:<></>}</li>
        <li ><Link style={{textDecoration:'none'}} to="/profile">Profile</Link></li>
    
    </ul>
    <div className="Nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:  <Link to="/login">   <button>Login</button></Link>
    }
    <Link to="/cart">    <img src={cart} alt=""></img></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
    </div>
</div>





    )
}
export default Navbar;