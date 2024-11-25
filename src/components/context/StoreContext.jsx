// import { createContext, useEffect, useState } from "react";
// import { food_list } from "../../assets/assets";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});

//   const addToCart = (itemId) => {
//     if ((!cartItems, [itemId])) {
//       setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//     } else {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     }

//     const removeFromCart = (itemId) => {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     };

//     useEffect(() => {
//       console.log(cartItems);
//     }, [cartItems]);

//     const contextValue = {
//       food_list,
//       cartItems,
//       setCartItems,
//       addToCart,
//       removeFromCart,
//     };

//     return (
//       <StoreContext.Provider value={contextValue}>
//         {props.children}
//       </StoreContext.Provider>
//     );
//   };
// };
// export default StoreContextProvider;

import { createContext, useEffect, useState } from "react";
import { food_list } from "../../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    // Check if item already exists in the cart
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 })); // Add item with quantity 1 if not in the cart
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 })); // Increment the item quantity
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 }; // Decrease item quantity
      } else {
        const { [itemId]: _, ...newCart } = prev; // Remove item from cart if quantity is 1
        return newCart;
      }
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
      // let itemInfo = food_list.find((product)=>product._id===item);
      // totalAmount += itemInfo.price*cartItems[item];
    }
    return totalAmount;
  };
  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
