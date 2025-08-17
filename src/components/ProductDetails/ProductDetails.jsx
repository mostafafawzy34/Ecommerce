// import React, { useContext, useEffect } from "react";
// import "./ProductDetails.module.css";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import Loader from "../Loader/Loader";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
// import { CartContext } from "../../Context/CartContext";

// export default function ProductDetails() {
//   let { id, category } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useContext(CartContext);

//   async function addToCartHandler(productId, e) {
//     e.stopPropagation(); // Prevent Card Click Navigation
//     await addToCart(productId);
//   }

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [id]);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//   };

//   function getProductDetails() {
//     return axios
//       .get("https://ecommerce.routemisr.com/api/v1/products")
//       .then((data) => {
//         return data.data.data.filter(
//           (product) => product.category.name === category
//         );
//       });
//   }

//   let { data: relatedProducts, isLoading } = useQuery({
//     queryKey: ["relatedProducts", category],
//     queryFn: getProductDetails,
//   });

//   function getDetails() {
//     return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
//   }

//   let {
//     data: productData,
//     isFetching,
//     error,
//   } = useQuery({
//     queryKey: ["productDetails", id],
//     queryFn: getDetails,
//     gcTime: 0,
//   });

//   let productDetails = productData?.data?.data;

//   function handleCardClick(productId, categoryName) {
//     navigate(`/productDetails/${productId}/${categoryName}`);
//   }

//   return (
//     <>
//       <div className="flex justify-center items-center min-h-screen bg-white px-10 py-16">
//         {isFetching || !productDetails?.images ? (
//           <Loader />
//         ) : (
//           <div className="flex flex-col md:flex-row w-full max-w-7xl gap-12 items-center justify-center">
//             <div className="w-full md:w-1/2 flex justify-center">
//               {productDetails.images.length > 0 ? (
//                 <div className="w-[300px] h-[450px] relative">
//                   <Slider {...settings}>
//                     {productDetails.images.map((src, index) => (
//                       <img
//                         key={index}
//                         src={src}
//                         alt=""
//                         className="w-full h-full object-contain rounded-xl"
//                       />
//                     ))}
//                   </Slider>
//                 </div>
//               ) : (
//                 <img
//                   src={productDetails.imageCover}
//                   alt=""
//                   className="w-[300px] h-[450px] object-contain rounded-xl"
//                 />
//               )}
//             </div>

//             <div className="w-full md:w-1/2 space-y-6">
//               <h1 className="text-green-800 text-4xl font-bold">
//                 {productDetails?.title.split(' ').slice(0, 6).join(' ')}
//               </h1>

//               <p className="text-sm font-medium text-green-600">
//                 {productDetails?.category.name}
//               </p>

//               <p className="text-gray-500 text-sm">
//                 <span className="font-semibold text-gray-600">DeFacto</span> |
//                 <span className="text-green-500 font-medium ml-1">
//                   Available
//                 </span>
//               </p>

//               <div className="flex items-center gap-2 text-yellow-500 text-lg">
//                 <i className="fa fa-star" />
//                 <span className="text-gray-800">
//                   {productDetails?.ratingsAverage}
//                 </span>
//               </div>

//               <p className="text-gray-600 text-base line-clamp-4">
//                 {productDetails?.description}
//               </p>

//               <p className="text-[#0aad0a] text-2xl font-semibold">
//                 EGP {productDetails?.price}
//               </p>

//               <div className="flex gap-4 mt-4">
//                 <button
//                   onClick={(e) => addToCartHandler(productDetails._id, e)}
//                   className="bg-[#0aad0a] cursor-pointer hover:bg-green-700 text-white text-sm px-5 py-3 rounded-md flex items-center gap-2 transition-all duration-200"
//                 >
//                   <i className="fa fa-cart-plus" /> ADD TO CART
//                 </button>
//                 <button
//                   onClick={(e) => e.stopPropagation()}
//                   className="bg-[#0aad0a] hover:bg-green-700 text-white text-lg px-4 py-3 rounded-md transition-all duration-200"
//                 >
//                   <i className="fa fa-heart" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="container mx-auto px-4">
//         {isLoading ? (
//           <div className="flex justify-center items-center my-24">
//             <Loader />
//           </div>
//         ) : null}

//         {error ? (
//           <div className="flex justify-center mt-10">
//             <div className="bg-red-50 border border-red-300 text-red-700 px-6 py-4 rounded-xl shadow-lg flex items-center gap-4 w-fit max-w-full text-base font-medium">
//               <i className="fas fa-exclamation-circle text-red-500 text-2xl"></i>
//               <span>{error.message}</span>
//             </div>
//           </div>
//         ) : null}

//         {!isLoading && (
//           <>
//             <h2 className="text-3xl font-bold text-center text-green-800 mt-16 mb-6">
//               Related Products
//             </h2>

//             <div className="flex flex-wrap gap-y-8 gap-x-4 justify-center mt-12">
//               {relatedProducts?.length === 0 && (
//                 <p className="text-center text-gray-500">
//                   No related products found.
//                 </p>
//               )}
//               {relatedProducts?.map((product) => (
//                 <div
//                   key={product.id}
//                   className="sm:w-[90%] md:w-[45%] lg:w-[30%] xl:w-[23%] px-3 cursor-pointer"
//                   onClick={() => handleCardClick(product._id, product.category.name)}
//                 >
//                   <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 h-full flex flex-col justify-between">
//                     <div className="relative group mb-4">
//                       <img
//                         src={product.imageCover}
//                         className="w-full h-[230px] object-cover rounded-lg"
//                         alt={product.title}
//                       />
//                       <div className="absolute inset-0 bg-gray-900/50 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-600 ease-in-out">
//                         <button
//                           title="Add to Wishlist"
//                           className="text-white text-xl hover:text-red-400 z-10"
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           <FaHeart />
//                         </button>
//                         <button
//                           onClick={(e) => addToCartHandler(product._id, e)}
//                           title="Add to Cart"
//                           className="text-white text-xl hover:text-green-400 z-10"
//                         >
//                           <FaShoppingCart />
//                         </button>
//                         <Link
//                           to={`/productDetails/${product._id}/${product.category.name}`}
//                           title="View Details"
//                           onClick={(e) => e.stopPropagation()}
//                           className="text-white text-xl hover:text-blue-400 z-10"
//                         >
//                           <FaEye />
//                         </Link>
//                       </div>
//                     </div>

//                     <h3 className="text-base text-main-color font-semibold mb-1 truncate">
//                       {product.category.name}
//                     </h3>
//                     <p className="text-gray-800 text-sm mb-3 line-clamp-1">
//                       {product.title.split(" ").slice(0, 3).join(" ")}
//                     </p>
//                     <div className="flex justify-between items-center text-sm font-medium mt-auto pt-2">
//                       <p className="text-green-600 text-base">
//                         {product.price} EGP
//                       </p>
//                       <p>
//                         <i className="fa fa-star text-yellow-500 flex items-center gap-1 text-base"></i>{" "}
//                         {product.ratingsAverage}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }
import React, { useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function ProductDetails() {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  // ✅ Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // ✅ Slick Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  // ✅ Fetch Product Details
  const getDetails = async () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  };

  const {
    data: productData,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getDetails,
    gcTime: 0,
  });

  const productDetails = productData?.data?.data;

  // ✅ Fetch Related Products
  const getRelatedProducts = async () => {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    return data.data.filter((p) => p.category.name === category);
  };

  const {
    data: relatedProducts,
    isLoading: relatedLoading,
    error: relatedError,
  } = useQuery({
    queryKey: ["relatedProducts", category],
    queryFn: getRelatedProducts,
  });

  // ✅ Handlers
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

  return (
    <>
      {/* ================== Product Details ================== */}
      <div className="flex justify-center items-center min-h-[60vh] bg-white px-6 py-12 mb-35 mt-22">
        {isFetching || !productDetails?.images ? (
          <Loader />
        ) : error ? (
          <div className="bg-red-50 border border-red-300 text-red-700 px-6 py-4 rounded-xl shadow-lg flex items-center gap-4 text-base font-medium">
            <i className="fas fa-exclamation-circle text-red-500 text-2xl"></i>
            <span>{error.message}</span>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row w-full max-w-6xl gap-12 items-center">
            {/* Left: Image / Slider */}
            <div className="w-full md:w-1/2 flex justify-center">
              {productDetails.images?.length > 0 ? (
                <div className="w-[320px] h-[450px]">
                  <Slider {...settings}>
                    {productDetails.images.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`product-${index}`}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    ))}
                  </Slider>
                </div>
              ) : (
                <img
                  src={productDetails.imageCover}
                  alt={productDetails.title}
                  className="w-[320px] h-[450px] object-contain rounded-xl"
                />
              )}
            </div>

            {/* Right: Info */}
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-green-800 text-3xl font-bold">
                {productDetails?.title.split(" ").slice(0, 6).join(" ")}
              </h1>

              <p className="text-sm font-medium text-green-600">
                {productDetails?.category.name}
              </p>

              <div className="flex items-center gap-2 text-yellow-500 text-lg">
                <i className="fa fa-star" />
                <span className="text-gray-800">{productDetails?.ratingsAverage}</span>
              </div>

              <p className="text-gray-600 text-base line-clamp-4">
                {productDetails?.description}
              </p>

              <p className="text-[#0aad0a] text-2xl font-semibold">
                {productDetails?.price} EGP
              </p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={(e) => addToCartHandler(productDetails._id, e)}
                  className="bg-[#0aad0a] hover:bg-green-700 text-white cursor-pointer text-sm px-5 py-3 rounded-md flex items-center gap-2 transition-all duration-200"
                >
                  <FaShoppingCart /> ADD TO CART
                </button>
                <button
                  onClick={(e) => addToWishlistHandler(productDetails._id, e)}
                  className="bg-red-500 hover:bg-red-600 cursor-pointer text-white text-lg px-4 py-3 rounded-md transition-all duration-200"
                >
                  <FaHeart />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================== Related Products ================== */}
      <div className="container mx-auto px-4 mb-20">
        {relatedLoading ? (
          <div className="flex justify-center items-center my-20">
            <Loader />
          </div>
        ) : relatedError ? (
          <div className="flex justify-center mt-10">
            <div className="bg-red-50 border border-red-300 text-red-700 px-6 py-4 rounded-xl shadow-lg flex items-center gap-4 text-base font-medium">
              <i className="fas fa-exclamation-circle text-red-500 text-2xl"></i>
              <span>{relatedError.message}</span>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center text-green-800 mt-0 mb-6">
              Related Products
            </h2>

            {relatedProducts?.length === 0 ? (
              <p className="text-center text-gray-500 my-12">
                No related products found.
              </p>
            ) : (
              <div className="flex flex-wrap gap-y-8 gap-x-4 justify-center mt-12">
                {relatedProducts?.map((product) => (
                  <div
                    key={product._id}
                    className="sm:w-[90%] md:w-[45%] lg:w-[30%] xl:w-[23%] px-3 cursor-pointer"
                    onClick={() => handleCardClick(product._id, product.category.name)}
                  >
                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 h-full flex flex-col justify-between">
                      <div className="relative group mb-4">
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className="w-full h-[230px] object-cover rounded-lg"
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
                            className="text-white text-xl cursor-pointer hover:text-green-400 z-10"
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

                      <h3 className="text-base text-main-color font-semibold mb-1 truncate">
                        {product.category.name}
                      </h3>
                      <p className="text-gray-800 text-sm mb-3 line-clamp-1">
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
            )}
          </>
        )}
      </div>
    </>
  );
}
