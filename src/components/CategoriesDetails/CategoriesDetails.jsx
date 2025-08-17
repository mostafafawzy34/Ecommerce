// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import Loader from '../Loader/Loader';
// import { CartContext } from '../../Context/CartContext';
// import { WishlistContext } from '../../Context/WishlistContext';
// import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';

// export default function CategoryDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useContext(CartContext);
//   const { addToWishlist } = useContext(WishlistContext);

//   const [products, setProducts] = useState([]);
//   const [categoryName, setCategoryName] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState('');

//   async function getCategoryProducts() {
//     try {
//       let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`);
//       setProducts(data.data);
//     } catch (error) {
//       setErrorMsg('Failed to load products for this category.');
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function getCategoryName() {
//     try {
//       let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
//       setCategoryName(data.data.name);
//     } catch (error) {
//       setCategoryName('Unknown Category');
//     }
//   }

//   function handleCardClick(productId, categoryName) {
//     navigate(`/productDetails/${productId}/${categoryName}`);
//   }

//   async function addToCartHandler(productId, e) {
//     e.stopPropagation();
//     await addToCart(productId);
//   }

//   async function addToWishlistHandler(productId, e) {
//     e.stopPropagation();
//     await addToWishlist(productId);
//   }

//   useEffect(() => {
//     setIsLoading(true);
//     setErrorMsg('');
//     getCategoryProducts();
//     getCategoryName();
//   }, [id]);

//   return (
//     <div className="container mx-auto my-6 px-4">
//       <div className="text-center mb-6">
//         <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 capitalize">
//           {categoryName} Products
//         </h2>
//         <div className="w-20 h-1 bg-green-700 mx-auto mt-2 rounded-full"></div>
//       </div>

//       {isLoading && (
//         <div className="flex justify-center items-center my-24">
//           <Loader />
//         </div>
//       )}

//       {errorMsg && (
//         <div className="flex justify-center mt-10">
//           <div className="bg-red-50 border border-red-300 text-red-700 px-6 py-4 rounded-xl shadow-lg flex items-center gap-4 w-fit max-w-full text-base font-medium">
//             <i className="fas fa-exclamation-circle text-red-500 text-2xl"></i>
//             <span>{errorMsg}</span>
//           </div>
//         </div>
//       )}

//       {!isLoading && products.length === 0 && !errorMsg && (
//         <div className="flex flex-col items-center justify-center my-24">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
//             alt="No Products"
//             className="w-40 h-40 mb-4"
//           />
//           <p className="text-gray-600 text-lg font-semibold">
//             No products found for this category.
//           </p>
//         </div>
//       )}

//       <div className="flex flex-wrap gap-y-8 gap-x-4 justify-center mt-12">
//         {products.map((product) => (
//           <div
//             key={product._id}
//             onClick={() => handleCardClick(product._id, product.category.name)}
//             className="sm:w-[90%] md:w-[45%] lg:w-[30%] xl:w-[23%] px-3 cursor-pointer"
//           >
//             <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-400 p-5 h-full flex flex-col justify-between">
//               <div className="relative group mb-4">
//                 <img
//                   src={product.imageCover}
//                   alt={product.title}
//                   className="w-full h-[280px] object-cover rounded-lg"
//                 />

//                 {/* Hover Overlay */}
//                 <div className="absolute inset-0 bg-gray-900/50 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-600 ease-in-out">
//                   <button
//                     title="Add to Wishlist"
//                     className="text-white text-xl hover:text-red-400 z-10"
//                     onClick={(e) => addToWishlistHandler(product._id, e)}
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
//               <h3 className="text-main-color text-base font-semibold truncate mb-1">
//                 {product.category.name}
//               </h3>
//               <p className="text-gray-800 text-sm mb-3 line-clamp-2">
//                 {product.title.split(' ').slice(0, 3).join(' ')}
//               </p>
//               <div className="flex justify-between items-center text-sm font-medium mt-auto pt-2">
//                 <p className="text-green-600 text-base">
//                   {product.price} EGP
//                 </p>
//                 <p className="flex items-center gap-1 text-yellow-500">
//                   <i className="fa fa-star text-base"></i>
//                   {product.ratingsAverage}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate, useOutletContext } from "react-router-dom";
import Loader from "../Loader/Loader";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";

export default function CategoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Access Layout's context to hide footer while loading
  const { setIsPageLoading } = useOutletContext();

  async function getCategoryProducts() {
    try {
      setIsLoading(true);
      setIsPageLoading(true); // 🔥 hide footer
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
      );
      setProducts(data.data);
    } catch (error) {
      setErrorMsg("Failed to load products for this category.");
    } finally {
      setIsLoading(false);
      setIsPageLoading(false); // ✅ show footer again
    }
  }

  async function getCategoryName() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}`
      );
      setCategoryName(data.data.name);
    } catch (error) {
      setCategoryName("Unknown Category");
    }
  }

  function handleCardClick(productId, categoryName) {
    navigate(`/productDetails/${productId}/${categoryName}`);
  }

  async function addToCartHandler(productId, e) {
    e.stopPropagation();
    await addToCart(productId);
  }

  async function addToWishlistHandler(productId, e) {
    e.stopPropagation();
    await addToWishlist(productId);
  }

  useEffect(() => {
    setErrorMsg("");
    getCategoryProducts();
    getCategoryName();
  }, [id]);

  // ✅ Loader: show ONLY loader (no content/footer)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto my-6 px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 capitalize">
          {categoryName} Products
        </h2>
        <div className="w-20 h-1 bg-green-700 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* Error */}
      {errorMsg && (
        <div className="flex justify-center mt-10">
          <div className="bg-red-50 border border-red-300 text-red-700 px-6 py-4 rounded-xl shadow-lg flex items-center gap-4 w-fit max-w-full text-base font-medium">
            <i className="fas fa-exclamation-circle text-red-500 text-2xl"></i>
            <span>{errorMsg}</span>
          </div>
        </div>
      )}

      {/* No Products */}
      {!errorMsg && products.length === 0 && (
        <div className="flex flex-col items-center justify-center my-24">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No Products"
            className="w-40 h-40 mb-4"
          />
          <p className="text-gray-600 text-lg font-semibold">
            No products found for this category.
          </p>
        </div>
      )}

      {/* Products Grid */}
      <div className="flex flex-wrap gap-y-8 gap-x-4 justify-center mt-12">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() =>
              handleCardClick(product._id, product.category.name)
            }
            className="sm:w-[90%] md:w-[45%] lg:w-[30%] xl:w-[23%] px-3 cursor-pointer"
          >
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-400 p-5 h-full flex flex-col justify-between">
              <div className="relative group mb-4">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-[280px] object-cover rounded-lg"
                />

                {/* Hover Overlay */}
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

              {/* Text Info */}
              <h3 className="text-main-color text-base font-semibold truncate mb-1">
                {product.category.name}
              </h3>
              <p className="text-gray-800 text-sm mb-3 line-clamp-2">
                {product.title.split(" ").slice(0, 3).join(" ")}
              </p>
              <div className="flex justify-between items-center text-sm font-medium mt-auto pt-2">
                <p className="text-green-600 text-base">{product.price} EGP</p>
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
