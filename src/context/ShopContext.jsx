import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import productData from "../data/products.json";


export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;


  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    // Load from localStorage if exists
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Load product data from JSON file
  useEffect(() => {
    setProducts(productData); // this is fine now
  }, []);

  // Add to cart
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Please select a size.");
      return;
    }

    const updatedCart = structuredClone(cartItems);

    if (updatedCart[itemId]) {
      updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;
    } else {
      updatedCart[itemId] = { [size]: 1 };
    }

    setCartItems(updatedCart);
    toast.success("Item added to cart!");
  };

  // Update cart quantity
  const updateQuantity = (itemId, size, quantity) => {
    const updatedCart = structuredClone(cartItems);
    if (updatedCart[itemId]) {
      updatedCart[itemId][size] = quantity;
    }
    setCartItems(updatedCart);
    toast.info("Cart updated!");
  };

  // Get cart item count
  const getCartCount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        total += cartItems[itemId][size] || 0;
      }
    }
    return total;
  };

  // Calculate total cart amount
  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;

      for (const size in cartItems[itemId]) {
        total += (product.price || 0) * (cartItems[itemId][size] || 0);
      }
    }
    return total;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
