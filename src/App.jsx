import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import CategoriesDetails from "./components/CategoriesDetails/CategoriesDetails";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import BrandDetails from "./components/Brands/BrandDetails";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ProtectedAuth from "./components/ProtectedAuth/ProtectedAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { Toaster } from "react-hot-toast";
import AllOrders from "./components/AllOrders/AllOrders";
import CheckOut from "./components/CheckOut/CheckOut";
import Wishlist from "./components/Wishlist/Wishlist";
import Loader from "./components/Loader/Loader"; // ✅ Reuse Loader

function App() {
  const queryClient = new QueryClient();

  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Navbar + Footer live here
      children: [
        { index: true, element: <Home /> },
        {
          path: "productDetails/:id/:category",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        { path: "cart", element: <Cart /> },
        { path: "categories", element: <Categories /> },
        { path: "categoryDetails/:id", element: <CategoriesDetails /> },
        { path: "products", element: <Products /> },
        { path: "brands", element: <Brands /> },
        { path: "brandDetails/:id", element: <BrandDetails /> },
        {
          path: "login",
          element: (
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoutes>
              <CheckOut />
            </ProtectedRoutes>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedAuth>
              <Register />
            </ProtectedAuth>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* ✅ Global loader while routes are being resolved */}
        <RouterProvider router={routes} fallbackElement={<Loader />} />
        <ReactQueryDevtools initialIsOpen={false} />
   <Toaster
  position="top-right"
  gutter={8} // space between toasts
  toastOptions={{
    duration: 2000,
    style: {
      marginTop: "70px", // push down below navbar (adjust to navbar height)
    },
  }}
/>

      </QueryClientProvider>
    </>
  );
}

export default App;
