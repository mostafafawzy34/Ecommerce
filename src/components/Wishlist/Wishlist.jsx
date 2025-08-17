// import React, { useContext, useEffect, useState } from "react";
// import { WishlistContext } from "../../Context/WishlistContext";
// import Loader from "../Loader/Loader";
// import { Link } from "react-router-dom";
// import emptyCart from "../../assets/emptyCart.png"; // You can replace with emptyWishlist image

// export default function Wishlist() {
//   const {
//     wishlistItems,
//     getWishlist,
//     removeWishlistItem,
//     clearWishlist,
//   } = useContext(WishlistContext);

//   const [isLoading, setIsLoading] = useState(true);

//   async function fetchWishlist() {
//     await getWishlist();
//     setIsLoading(false);
//   }

//   async function removeProduct(productId) {
//     await removeWishlistItem(productId);
//   }

//   async function clearAllWishlist() {
//     await clearWishlist();
//   }

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   return (
//     <div className="container mx-auto my-10 px-4">
//       {isLoading ? <Loader /> : null}

//       {wishlistItems.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-20 text-gray-500">
//           <img className="w-[220px]" src={emptyCart} alt="" />
//           <p className="text-2xl font-semibold">Your wishlist is empty</p>
//           <p className="text-base mt-2">Add items you love to save them here!</p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto bg-white rounded-lg shadow-md p-6">
//           <table className="table-auto w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100 text-center align-middle">
//                 <th className="py-3 px-2">Product Image</th>
//                 <th className="py-3 px-2">Product Name</th>
//                 <th className="py-3 px-2">Unit Price</th>
//                 <th className="py-3 px-2">Methods</th>
//               </tr>
//             </thead>
//             <tbody>
//               {wishlistItems.map((item) => (
//                 <tr
//                   key={item?.id}
//                   className="text-center align-middle border-b hover:bg-gray-50"
//                 >
//                   <td className="py-4">
//                     <div className="flex justify-center">
//                       <div className="w-[80px] h-[80px]">
//                         <img
//                           src={item.imageCover}
//                           className="w-full h-full object-cover rounded-md shadow-sm"
//                           alt="Product"
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-4 font-medium">{item?.title}</td>
//                   <td className="py-4">{item?.price} EGP</td>
//                   <td className="py-4 flex justify-center gap-4">
//                     <Link
//                       to={`/productDetails/${item._id}/${item.category.name}`}
//                       className="bg-main-color text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
//                     >
//                       View Details
//                     </Link>
//                     <button
//                       onClick={() => removeProduct(item?._id)}
//                       className="text-red-500 hover:text-red-600 cursor-pointer px-3 py-2 transition duration-300"
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {/* Footer Row */}
//               <tr className="h-16 bg-gray-100">
//                 <td
//                   className="text-center text-2xl font-semibold text-green-600"
//                   colSpan={2}
//                 >
//                   Total Items: {wishlistItems.length}
//                 </td>
//                 <td></td>
//                 <td className="text-right pr-4">
//                   <button
//                     onClick={clearAllWishlist}
//                     className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition duration-300 mr-4"
//                   >
//                     Clear Wishlist
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import Loader from "../Loader/Loader";
import { Link, useOutletContext } from "react-router-dom";
import { FaShoppingCart, FaTrash, FaStar } from "react-icons/fa";
import emptyCart from "../../assets/emptyCart.png"; // Replace with emptyWishlist if available

export default function Wishlist() {
  const { wishlistItems, getWishlist, removeFromWishlist, clearWishlist } =
    useContext(WishlistContext);

  const { addToCart } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(true);

  const { setIsPageLoading } = useOutletContext();

  async function fetchWishlist() {
    setIsLoading(true);
    setIsPageLoading(true);
    await getWishlist();
    setIsLoading(false);
    setIsPageLoading(false);
  }

  async function removeProduct(productId) {
    await removeFromWishlist(productId);
  }

  async function clearAllWishlist() {
    await clearWishlist();
  }

  useEffect(() => {
    fetchWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 px-4">
      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <img className="w-[180px]" src={emptyCart} alt="" />
          <p className="text-xl font-semibold">Your wishlist is empty</p>
          <p className="text-sm mt-2">Add items you love to save them here!</p>
        </div>
      ) : (
        <div className="bg-gray-100 p-5 rounded-2xl shadow-md">
          {/* Header */}
          <h2 className="text-xl font-bold text-green-600 mb-5 flex items-center gap-2">
            Favorite Products <span></span>
          </h2>

          {/* Wishlist Items */}
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center justify-between bg-white rounded-xl shadow p-4"
              >
                {/* Image */}
                <div className="flex-shrink-0">
                  <Link to={`/productDetails/${item._id}/${item.category.name}`}>
                    <img
                      src={item.imageCover}
                      alt={item.title}
                      className="w-28 h-28 object-contain rounded-lg border hover:scale-105 transition duration-300"
                    />
                  </Link>
                </div>

                {/* Product Info */}
                <div className="flex-1 text-center md:text-left mt-3 md:mt-0 md:ml-5">
                  <Link
                    to={`/productDetails/${item._id}/${item.category.name}`}
                    className="text-lg font-semibold text-black hover:text-green-600 transition "
                  >
                    {item.title}
                  </Link>
                  <div className="flex items-center justify-center md:justify-start gap-1 mt-1 text-yellow-500 text-sm">
                    <FaStar />
                    <span className="text-gray-700 font-medium">4.8</span>
                  </div>
                  <p className="text-base text-gray-800 font-semibold mt-1">
                    Price: <span className="text-green-600">{item.price} EGP</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.category?.name} | Brand |{" "}
                    <span className="text-green-600 font-medium">Available</span>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-3 md:mt-0">
                  <button
                    onClick={() => addToCart(item._id)}
                    className="flex items-center cursor-pointer justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm transition duration-300 shadow"
                  >
                    <FaShoppingCart /> ADD TO CART
                  </button>
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="flex items-center cursor-pointer justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm transition duration-300 shadow"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Remove All */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={clearAllWishlist}
              className="flex items-center cursor-pointer gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full text-sm transition duration-300 shadow"
            >
              <FaTrash /> Remove All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
