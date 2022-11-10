import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice((prev) => prev + product.price * quantity);
    setTotalQuantities((prev) => prev + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        return cartProduct;
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, product]);
    }

    toast.success(`${quantity} ${product.name} added to your cart.`);
  };

  const onRemove = (id) => {
    foundProduct = cartItems.find((item) => item._id === id);

    setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prev) => prev - foundProduct.quantity);
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.indexOf(foundProduct);

    const num = value === 'inc' ? 1 : foundProduct.quantity > 1 ? -1 : 0;

    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: item.quantity + num };
        }
        return item;
      })
    );
    setTotalPrice((prev) => prev + foundProduct.price * num);
    setTotalQuantities((prev) => prev + num);

    // if (value === 'inc') {
    //   setCartItems([
    //     ...newCartItems,
    //     { ...foundProduct, quantity: foundProduct.quantity + 1 },
    //   ]);
    //   setTotalPrice((prev) => prev + foundProduct.price);
    //   setTotalQuantities((prev) => prev + 1);
    // } else if (value === 'dec') {
    //   if (foundProduct.quantity - 1 >= 1) {
    //     setCartItems([
    //       ...newCartItems,
    //       { ...foundProduct, quantity: foundProduct.quantity - 1 },
    //     ]);
    //     setTotalPrice((prev) => prev - foundProduct.price);
    //     setTotalQuantities((prev) => prev - 1);
    //   }
    // }
  };

  const increaseQty = () => {
    setQty((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        increaseQty,
        decreaseQty,
        onAdd,
        onRemove,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
