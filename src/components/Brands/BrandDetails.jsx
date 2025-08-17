
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import noProduct from "../../assets/images.png";

export default function BrandDetails() {
  let { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const [products, setProducts] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const { setIsPageLoading } = useOutletContext();

  async function getBrandProducts() {
    try {
      setIsLoading(true);
      setIsPageLoading(true); // 🔥 hide footer
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
      );
      setProducts(data.data);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
      setIsPageLoading(false); // ✅ show footer again
    }
  }

  async function getBrandName() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${id}`
      );
      setBrandName(data.data.name);
    } catch (error) {
      setBrandName("Unknown Brand");
    }
  }

  async function addToCartHandler(productId, e) {
    e.stopPropagation();
    await addToCart(productId);
  }

  async function addToWishlistHandler(productId, e) {
    e.stopPropagation();
    await addToWishlist(productId);
  }

  function handleCardClick(productId, categoryName) {
    navigate(`/productDetails/${productId}/${categoryName}`);
  }

  useEffect(() => {
    getBrandProducts();
    getBrandName();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto my-4 px-2 mb-20">
      {/* Header */}
      <div className="text-center mb-6">
        <h2
          className="text-3xl md:text-4xl font-extrabold"
          style={{ color: "#0aad0a" }}
        >
          {brandName}
        </h2>
        <div className="w-20 h-1 bg-[#0aad0a] mx-auto mt-2 rounded-full"></div>
      </div>

      {errorMsg && (
        <div className="flex justify-center mt-10">
          <div className="bg-red-50 border border-red-300 text-red-700 px-6 py-4 rounded-xl shadow-lg flex items-center gap-4 w-fit max-w-full text-base font-medium">
            <i className="fas fa-exclamation-circle text-red-500 text-2xl"></i>
            <span>{errorMsg}</span>
          </div>
        </div>
      )}

      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center my-24">
          <img src={noProduct} alt="No Products" className="w-50 mb-6" />
          <p className="text-center text-gray-500 text-lg font-semibold">
            No products found for this brand.
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-y-4 gap-x-2 justify-center mt-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="sm:w-[90%] md:w-[45%] lg:w-[30%] xl:w-[23%] px-3 cursor-pointer"
            onClick={() =>
              handleCardClick(product._id, product.category.name)
            }
          >
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 h-full flex flex-col justify-between">
              <div className="relative group mb-4">
                <img
                  src={product.imageCover}
                  className="w-full h-[230px] object-cover rounded-lg"
                  alt={product.title}
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
                    className="text-white cursor-pointer text-xl hover:text-blue-400 z-10"
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
    </div>
  );
}
