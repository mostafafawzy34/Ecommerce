import axios from "axios";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [isCartLoading, setIsCartLoading] = useState(true);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function addToCart(productId) {
    const toastId = toast.loading("Adding your product...");
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      );

      toast.success(data.message, { id: toastId });
      await getCart();
      return data.message;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg, { id: toastId });
      return errorMsg;
    }
  }

  async function getCart() {
    try {
      setIsCartLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
      );

      setNumOfCartItems(data.numOfCartItems || 0);
      setTotalPrice(data?.data?.totalCartPrice || 0);
      setCartId(data?.data?._id || null);
      setCartItems(data?.data?.products || []);
    } catch (error) {
      console.log(error);
      setNumOfCartItems(0);
      setTotalPrice(0);
      setCartId(null);
      setCartItems([]);
    } finally {
      setIsCartLoading(false);
    }
  }

  async function updateCart(productId, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      );

      await getCart();
      return data;
    } catch (error) {
      console.log(error);
      return error.response?.data?.message || "Something went wrong";
    }
  }

  async function removeCartItem(productId) {
    const toastId = toast.loading("Removing product...");

    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      );

      toast.success(data.message, { id: toastId });
      await getCart();
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
      console.log(error);
      return error.response?.data?.message || "Something went wrong";
    }
  }

  async function clearCart() {
    const toastId = toast.loading("Clearing cart...");

    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/`,
        { headers }
      );

      toast.success(data.message, { id: toastId });
      await getCart();
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
      console.log(error);
      return error.response?.data?.message || "Something went wrong";
    }
  }

  async function onlinePayment(shippingAddress) {
    const toastId = toast.loading("Processing payment...");
    console.log("Cart ID:", cartId);

    if (!cartId) {
      toast.error("Cart is empty or not loaded yet.", { id: toastId });
      return;
    }

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        { shippingAddress },
        { headers }
      );

      toast.success("Redirecting to payment", { id: toastId });
      window.location.href = data.session.url;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      console.log(error.response);
      toast.error(errorMsg, { id: toastId });

      if (errorMsg.includes("There is no cart for this user")) {
        window.location.href = "http://localhost:5173";
      }
    }
  }

  async function cashPayment(shippingAddress) {
    const toastId = toast.loading("Processing payment...");
    console.log("Cart ID:", cartId);

    if (!cartId) {
      toast.error("Cart is empty or not loaded yet.", { id: toastId });
      window.location.href = "http://localhost:5173";
      return;
    }

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress },
        { headers }
      );

      toast.success("Order placed successfully", { id: toastId });
      window.location.href = "http://localhost:5173";
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      console.log(error.response);
      toast.error(errorMsg, { id: toastId });
    }
  }

  useEffect(() => {
    if (headers.token) getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCart,
        removeCartItem,
        updateCart,
        numOfCartItems,
        totalPrice,
        cartItems,
        clearCart,
        onlinePayment,
        isCartLoading,
        cashPayment
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
