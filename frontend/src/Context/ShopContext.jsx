import React, { createContext, useEffect, useState } from "react";
// import all_product from '../Components/Assets/all_product';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;   
    }
    return cart;
};
const ShopContextProvider = (props) => {
    const [all_product, setAll_product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        // Fetch all products
        fetch('https://shopper-backend-tan.vercel.app/allproducts')
            .then(response => response.json())
            .then(data => setAll_product(data))
            .catch(error => console.error('Error fetching products:', error));

        // Fetch cart items if authenticated
        if (localStorage.getItem('auth-token')) {
            fetch('https://shopper-backend-tan.vercel.app/getcart', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', 
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}), 
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setCartItems(data.cartDate || {})) // Adjust according to actual data format
            .catch(error => console.error('Error fetching cart data:', error));
        }
    }, []);
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('https://shopper-backend-tan.vercel.app/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId":itemId}),
            })
            .then(response => response.json())
            .then(data => console.log(data))
        }
        
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('https://shopper-backend-tan.vercel.app/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId": itemId}),
            })
            .then(response => response.json())
            .then(data => console.log(data))
        }
    };

    const getTotalCartAmount = () => {
        let total = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                total += itemInfo.new_price * cartItems[item];
            }
        }
        return total;
    };
    
    const getCartItemsCount = () => {
        let count = 0;
        for (const item in cartItems) {
            count += cartItems[item];
        }
        return count;
    }

    const contextValue = {getCartItemsCount, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
