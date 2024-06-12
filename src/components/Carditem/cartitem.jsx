import React, { useContext, useState } from "react";
import "./ct.css";
import { ShopContext } from "../../context/shopcontent";
import remove_icon from "../Assets/cart_cross_icon.png";
import { Table } from "react-bootstrap";

const Cart = () => {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount,handleOrderDetails } = useContext(ShopContext);

  const cartProducts = all_product.filter((product) => cartItems[product.id] > 0);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "image":
        setImage(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "newPrice":
        setNewPrice(value);
        break;
      case "quantity":
        setQuantity(value);
        break;
      case "total":
        setTotal(value);
        break;
      default:
        break;
    }
  };
  const formData = {
    name,
    image,
    category,
    new_price: newPrice,
    quantity,
    Total: total,
  };

  const OrderDetails = async () => {
   
    const response = await fetch("http://localhost:4000/orderdetails", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const jsonData = await response.json();
    console.log(jsonData);
  };

  return (
    <>
    <div className="cartitems">
      <div className="cartitems-format">
        <Table responsive="lg">
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((product, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={product.image}
                    alt="Product"
                    className="carticone-product-icon"
                    value={formData.image}
                    onChange={handleInputChange}
                    name="image"
                  />
                </td>
                <td value={formData.name} onChange={handleInputChange} name="name">
                  {product.name}
                </td>
                <td>${product.new_price}</td>
                <td>
                  <button
                    className="cartitems-quantity"
                    value={quantity}
                    onChange={handleInputChange}
                    name="quantity"
                  >
                    {cartItems[product.id]}
                  </button>
                </td>
                <td value={formData.new_price} onChange={handleInputChange} name="newPrice">
                  ${product.new_price * cartItems[product.id]}
                </td>
                <td>
                  <img
                    src={remove_icon}
                    alt="Remove"
                    onClick={() => removeFromCart(product.id)}
                    className="carticon-remove"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
</div>
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping fee</p>
              <p>free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3 value={formData.total} onChange={handleInputChange} name="total">
                ${getTotalCartAmount()}
              </h3>
            </div>
          </div>
          <button onClick={()=>handleOrderDetails(name,image,newPrice,total)}>Proceed to checkout</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
