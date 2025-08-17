// src/Context/WishlistContext.jsx
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
  const [isWishlistLoading, setIsWishlistLoading] = useState(true);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function getWishlist() {
    try {
      setIsWishlistLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }
      );
      setWishlistItems(data.data || []);
      setNumOfWishlistItems(data.count || data.data?.length || 0);
    } catch (error) {
      console.log(error);
      setWishlistItems([]);
      setNumOfWishlistItems(0);
    } finally {
      setIsWishlistLoading(false);
    }
  }

  async function addToWishlist(productId) {
    const toastId = toast.loading("Adding to wishlist...");
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      );
      toast.success(data.message, { id: toastId });
      await getWishlist();
      return data.message;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
      return error.response?.data?.message || "Something went wrong";
    }
  }

  async function removeFromWishlist(productId) {
    const toastId = toast.loading("Removing from wishlist...");
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
      toast.success(data.message, { id: toastId });
      await getWishlist();
      return data.message;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
      return error.response?.data?.message || "Something went wrong";
    }
  }

  useEffect(() => {
    if (headers.token) getWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        numOfWishlistItems,
        isWishlistLoading,
        addToWishlist,
        removeFromWishlist,
        getWishlist,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
