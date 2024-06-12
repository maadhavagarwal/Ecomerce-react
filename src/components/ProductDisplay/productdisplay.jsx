import React, { useContext } from "react";
import star from "../Assets/star_icon.png";
import star_dull from "../Assets/star_dull_icon.png";
import "./pd.css";
import { ShopContext } from "../../context/shopcontent";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  if (!product) {
    return <div>Product not found</div>; // Ensure a valid product is passed
  }

  return (
    <div className="productdisplay">
      <div className="proddisplay-left">
        
        <div className="productdisplay-img">
          <img className="productdisplay-main" src={product.image} alt="Main product" />
        </div>
        <div className="productdisplay-img-list">
        <img src={product.image} alt="Main product" />
        <img src={product.image} alt="Main product" />
        <img src={product.image} alt="Main product" />
        <img src={product.image} alt="Main product" />
       
          </div>

      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1> {/* Removed extra 'Name' */}
        <div className="productdisplay-right-star">
          <img src={star} alt="Star" />
          <img src={star} alt="Star" />
          <img src={star} alt="Star" />
          <img src={star} alt="Star" />
          <img src={star_dull} alt="Dull Star" />
          <p>{122}</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="product-right-description">
          {product.description || "No description available."} {/* Handle long text */}
        </div>
        <div className="productdisplay-right-size">
  <h1>Product Size</h1>
</div>
<div className="productdisplay-right-size">
  <div>S</div>
  <div>M</div>
  <div>L</div>
  <div>XL</div>
  <div>XXL</div>


</div>
        <button onClick={() => addToCart(product.id)}>Add to cart</button>
        <p className="productdisplay-right-category">
          <span>Category: </span>
          {product.category || "Unknown"}
        </p>
        <p className="productdisplay-right-category">
          <span>Tags: </span>
          {product.tags || "No tags"}
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
