import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const {getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

  return (
    <div className="cart-items">
      <div className="cart-items-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cart-items-format cart-items-format-main">
                <img
                  className="cart-icon-product-icon"
                  src={e.image}
                  alt={e.name}
                />
                <p>{e.name}</p>
                <p>${e.new_price.toFixed(2)}</p>
                <button className="cart-items-quantity">
                  {cartItems[e.id]}
                </button>
                <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                <img
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt="Remove"
                  className="cart-item-remove-icon"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
    <div className="cart-items-down">
        <div className="cart-items-total">
            <h1>Cart Totals</h1>
            <div>
                <div className="cart-items-total-item">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-items-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cart-items-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cart-items-promo-code">
                <p>If you have a promo code, Enter it here</p>
                <div className="cart-items-promo-box">
                    <input type="text" placeholder="Enter Promo code..." />
                    <button>APPLY</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CartItems;
