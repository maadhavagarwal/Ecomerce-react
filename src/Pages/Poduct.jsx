import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopcontent";
import Breadcrum from "../components/Breadcums/Breadcrums";
import ProductDisplay from "../components/ProductDisplay/productdisplay";
import Description from "../components/Description/Cescription";
import RelatedProduct from "../components/Related/Relatedp";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  // Parse the productId if necessary and use a callback function for find
  const product = all_product.find((item) => item.id === parseInt(productId));
console.log(all_product)
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
    <Breadcrum/>
      <ProductDisplay product={product} />
      <Description />
      <RelatedProduct />
    </div>
  );
};

export default Product;
