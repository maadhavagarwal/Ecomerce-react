import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  const cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const[userdetail,setUserdetail]=useState([]);
  const[orderdetail,setOrderdetail]=useState([]);
 
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  // Fetch data and initialize cart
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/allproducts');
        const data = await response.json();

        if (data.products) {
          setAll_Product(data.products);
        }

        if (localStorage.getItem('auth-token')) {
          const cartResponse = await fetch('http://localhost:4000/getcart', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'auth-token': localStorage.getItem('auth-token'),
              'Content-Type': 'application/json',
            },
          });

          const cartData = await cartResponse.json();
          setCartItems(cartData.cart || getDefaultCart());
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProducts();
  }, []); // Ensure this runs only once when the component mounts

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/addtocart', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      });
    }
  };


  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/removefromcart', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      });
    }
  };
  const handleOrderDetails = () => {
    let totalAmount = 0;
    let totalItems = 0;
  
    // Calculate the total amount and total items
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
          totalItems += cartItems[item];
        }
      }
    }
  
    console.log("Total Amount:", totalAmount);
    console.log("Total Items:", totalItems);
    // Send each item to the backend
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          const name = itemInfo.name;
          const price = itemInfo.new_price;
          const image = itemInfo.image;
          const quantity = cartItems[item];
  
          fetch('http://localhost:4000/orderdetails', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'auth-token': localStorage.getItem('auth-token'),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: name,
              new_price: price,
              total: totalAmount, // Total amount of the entire order
              image: image,
              quantity: quantity,
            }),
          })
          .then(response => response.json())
          .then(data => {
            console.log("Order placed successfully:", quantity);
          })
         
          
          .catch(error => {
            console.error("Error placing order:", error);
          });
        }
      }
    }
  
    // Clear the cart and notify the user
    setCartItems({});
    alert("Order placed successfully!");
  };

  const getTotalCartAmount = () => {
   
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };
 
  const getUserDetail = async () => {
    try {
      const response = await fetch("http://localhost:4000/getUser", {
        method: "GET",
        headers: {
            "auth-token": localStorage.getItem('auth-token')
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonUserdata = await response.json();
    setUserdetail(jsonUserdata);
} catch (error) {
    console.error("Error fetching user details:", error);
}
  };
  const getOrderDetail = async () => {
    try {
      const response = await fetch('http://localhost:4000/getorder', {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonUserData = await response.json();
      setOrderdetail(jsonUserData);
      console.log(orderdetail); // Correctly log the fetched data
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    getOrderDetail();
  }, []); // Call the function once the component mounts
 

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    cartItems,
    getUserDetail,
    getOrderDetail,
     handleOrderDetails,
    orderdetail,
    userdetail,
  };

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
