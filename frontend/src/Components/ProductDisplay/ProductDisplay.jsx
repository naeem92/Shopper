import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null); // To keep track of the selected size

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="product-display">
      <div className="product-display-left">
        <div className="product-display-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="product-display-img">
          <div className="product-display-left">
            <img
              className="product-display-main-img"
              src={product.image}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="product-display-right">
        <h1>{product.name}</h1>
        <div className="product-display-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="product-display-right-prices">
          <div className="product-display-right-price-old">
            ${product.old_price}
          </div>
          <div className="product-display-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="product-display-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.
        </div>
        <div className="product-display-right-size">
          <h1>Select Size</h1>
          <div className="product-display-right-sizes">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className={selectedSize === size ? "active" : ""}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => { addToCart(product.id); }}>ADD TO CART</button>
        <p className="product-display-right-category"><span>Category :</span> Men,  Women, Kids</p>
        <p className="product-display-right-category"><span>Tags :</span> Moderne, Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
