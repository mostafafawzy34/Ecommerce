// import React, { useContext } from "react";
// import "./FeatureProducts.module.css";
// import axios from "axios";
// import Loader from "../Loader/Loader";
// import { useQuery } from "@tanstack/react-query";
// import { Link, useNavigate } from "react-router-dom";
// import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
// import { CartContext } from "../../Context/CartContext";

// export default function FeatureProducts() {
//   let { addToCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   async function addToCartHandler(productId, e) {
//     e.stopPropagation(); // Prevent card click navigation
//     await addToCart(productId);
//   }

//   function getProducts() {
//     return axios.get("https://ecommerce.routemisr.com/api/v1/products");
//   }

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["featureProductsData"],
//     queryFn: getProducts,
//     refetchInterval: 60000,
//   });

//   function handleCardClick(productId, categoryName) {
//     navigate(`/productDetails/${productId}/${categoryName}`);
//   }

//   return (
//     <div className="container mx-auto px-4">
//       {/* Loader */}
//       {isLoading && (
//         <div className="flex justify-center items-center my-24">
//           <Loader />
//         </div>
//       )}

//       {/* Error */}
//       {isError && (
//         <div className="flex justify-center mt-10">
//           <div className="bg-red-50 border border-red-300 text-red-700 px-6 py-4 rounded-xl shadow-lg flex items-center gap-4 w-fit max-w-full text-base font-medium">
//             <i className="fas fa-exclamation-circle text-red-500 text-2xl"></i>
//             <span>{error.message}</span>
//           </div>
//         </div>
//       )}

//       {/* Product Cards */}
//       <div className="flex flex-wrap gap-y-8 gap-x-4 justify-center mt-12">
//         {data?.data?.data.map((product) => (
//           <div
//             key={product.id}
//             className="sm:w-[90%] md:w-[45%] lg:w-[30%] xl:w-[23%] px-3 cursor-pointer"
//             onClick={() => handleCardClick(product._id, product.category.name)}
//           >
//             <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-400 p-5 h-full flex flex-col justify-between">
//               <div className="relative group mb-4">
//                 <img
//                   src={product.imageCover}
//                   className="w-full h-[280px] object-cover rounded-lg"
//                   alt={product.title}
//                 />
//                 {/* Hover Overlay */}
//                 <div className="absolute inset-0 bg-gray-900/50 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-600 ease-in-out">
//                   <button
//                     title="Add to Wishlist"
//                     className="text-white text-xl hover:text-red-400 z-10"
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     <FaHeart />
//                   </button>
//                   <button
//                     onClick={(e) => addToCartHandler(product._id, e)}
//                     title="Add to Cart"
//                     className="text-white cursor-pointer text-xl hover:text-green-400 z-10"
//                   >
//                     <FaShoppingCart />
//                   </button>
//                   <Link
//                     to={`/productDetails/${product._id}/${product.category.name}`}
//                     title="View Details"
//                     onClick={(e) => e.stopPropagation()}
//                     className="text-white text-xl hover:text-blue-400 z-10"
//                   >
//                     <FaEye />
//                   </Link>
//                 </div>
//               </div>

//               {/* Text Info */}
//               <div>
//                 <h3 className="text-base text-main-color font-semibold mb-1 truncate">
//                   {product.category.name}
//                 </h3>
//                 <p className="text-gray-800 text-sm mb-3 line-clamp-1">
//                   {product.title.split(" ").slice(0, 3).join(" ")}
//                 </p>
//                 <div className="flex justify-between items-center text-sm font-medium mt-auto pt-2">
//                   <p className="text-green-600 text-base">
//                     {product.price} EGP
//                   </p>
//                   <p className="flex items-center gap-1 text-yellow-500">
//                     <i className="fa fa-star text-base"></i>
//                     {product.ratingsAverage}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useContext } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function FeatureProducts() {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  async function addToCartHandler(productId, e) {
    e.stopPropagation();
    await addToCart(productId);
  }

  async function addToWishlistHandler(productId, e) {
    e.stopPropagation();
    await addToWishlist(productId);
  }

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["featureProductsData"],
    queryFn: getProducts,
    refetchInterval: 60000, // refresh every 1 min
  });

  function handleCardClick(productId, categoryName) {
    navigate(`/productDetails/${productId}/${categoryName}`);
  }

  // ✅ Loader: show only loader
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  // ✅ Error: friendly message
  if (isError) {
    return (
      <div className="flex justify-center mt-10">
        <div className="bg-red-50 border border-red-300 text-red-700 px-6 py-4 rounded-xl shadow-lg flex items-center gap-4 w-fit max-w-full text-base font-medium">
          <i className="fas fa-exclamation-circle text-red-500 text-2xl"></i>
          <span>{error.message || "Failed to load products."}</span>
        </div>
      </div>
    );
  }

  const products = data?.data?.data || [];

  // ✅ No Products
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-24">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No Products"
          className="w-40 h-40 mb-4"
        />
        <p className="text-gray-600 text-lg font-semibold">
          No featured products found.
        </p>
      </div>
    );
  }

  return (
<div className="container mx-auto px-4 mt-8 mb-16">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-700">
          Featured Products
        </h2>
        <div className="w-20 h-1 bg-green-700 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* Products Grid */}
      <div className="flex flex-wrap gap-y-8 gap-x-4 justify-center mt-8">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => handleCardClick(product._id, product.category.name)}
            className="sm:w-[90%] md:w-[45%] lg:w-[30%] xl:w-[23%] px-3 cursor-pointer"
          >
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-400 p-5 h-full flex flex-col justify-between">
              {/* Image + Hover Actions */}
              <div className="relative group mb-4">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-[280px] object-cover rounded-lg"
                />

                <div className="absolute inset-0 bg-gray-900/50 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-600 ease-in-out">
                  <button
                    title="Add to Wishlist"
                    className="text-white text-xl cursor-pointer hover:text-red-400 z-10"
                    onClick={(e) => addToWishlistHandler(product._id, e)}
                  >
                    <FaHeart />
                  </button>
                  <button
                    onClick={(e) => addToCartHandler(product._id, e)}
                    title="Add to Cart"
                    className="text-white cursor-pointer text-xl hover:text-green-400 z-10"
                  >
                    <FaShoppingCart />
                  </button>
                  <Link
                    to={`/productDetails/${product._id}/${product.category.name}`}
                    title="View Details"
                    onClick={(e) => e.stopPropagation()}
                    className="text-white text-xl hover:text-blue-400 z-10"
                  >
                    <FaEye />
                  </Link>
                </div>
              </div>

              {/* Product Info */}
              <h3 className="text-main-color text-base font-semibold truncate mb-1">
                {product.category.name}
              </h3>
              <p className="text-gray-800 text-sm mb-3 line-clamp-2">
                {product.title.split(" ").slice(0, 3).join(" ")}
              </p>
              <div className="flex justify-between items-center text-sm font-medium mt-auto pt-2">
                <p className="text-green-600 text-base">
                  {product.price} EGP
                </p>
                <p className="flex items-center gap-1 text-yellow-500">
                  <i className="fa fa-star text-base"></i>
                  {product.ratingsAverage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
