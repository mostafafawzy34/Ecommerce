// import React, { useContext, useEffect, useState } from "react";
// import "./Cart.module.css";
// import { CartContext } from "../../Context/CartContext";
// import Loader from "../Loader/Loader";
// import { Link } from "react-router-dom";
// import emptyCart from "../../assets/emptyCart.png";

// export default function Cart() {
//   const {
//     cartItems,
//     getCart,
//     removeCartItem,
//     updateCart,
//     totalPrice,
//     clearCart,
//   } = useContext(CartContext);

//   const [isLoading, setIsLoading] = useState(true);

//   async function getAllCart() {
//     await getCart();
//     setIsLoading(false);
//   }

//   async function removeProduct(productId) {
//     await removeCartItem(productId);
//   }
//   async function clearAllCart() {
//     await clearCart();
//     setCartItems([]);
//   }

//   async function updateCartProduct(productId, count) {
//     if (count < 1) {
//       await removeProduct(productId);
//       return;
//     }

//     await updateCart(productId, count);
//   }

//   useEffect(() => {
//     getAllCart();
//   }, []);

//   return (
//     <div className="container mx-auto my-10 px-4">
//       {isLoading ? <Loader /> : null}

//       {cartItems.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-20 text-gray-500">
//           <img className="w-[220px]" src={emptyCart} alt="" />
//           <p className="text-2xl font-semibold">Your cart is empty</p>
//           <p className="text-base mt-2">Add items to get started!</p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto bg-white rounded-lg shadow-md p-6">
//           <table className="table-auto w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100 text-center align-middle">
//                 <th className="py-3 px-2">Product Image</th>
//                 <th className="py-3 px-2">Product Name</th>
//                 <th className="py-3 px-2">Quantity</th>
//                 <th className="py-3 px-2">Unit Price</th>
//                 <th className="py-3 px-2">Total Price</th>
//                 <th className="py-3 px-2">Methods</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr
//                   key={item?.product?.id}
//                   className="text-center align-middle border-b hover:bg-gray-50"
//                 >
//                   <td className="py-4">
//                     <div className="flex justify-center">
//                       <div className="w-[80px] h-[80px]">
//                         <img
//                           src={item.product.imageCover}
//                           className="w-full h-full object-cover rounded-md shadow-sm"
//                           alt="Product"
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-4 font-medium">{item?.product?.title}</td>
//                   <td className="py-4">
//                     <div className="flex items-center justify-center space-x-4">
//                       <button
//                         onClick={() =>
//                           updateCartProduct(item?.product?.id, item.count + 1)
//                         }
//                         className="bg-main-color text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition duration-300"
//                       >
//                         +
//                       </button>
//                       <span className="text-base font-medium">
//                         {item.count}
//                       </span>
//                       <button
//                         onClick={() =>
//                           updateCartProduct(item?.product?.id, item.count - 1)
//                         }
//                         className="bg-main-color text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition duration-300"
//                       >
//                         -
//                       </button>
//                     </div>
//                   </td>
//                   <td className="py-4">{item?.price} EGP</td>
//                   <td className="py-4">{item?.price * item.count} EGP</td>
//                   <td className="py-4">
//                     <button
//                       onClick={() => removeProduct(item?.product?.id)}
//                       className="text-red-500 hover:text-red-600 cursor-pointer px-3 py-2 transition duration-300"
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {/* Total Price Row */}
//               <tr className="h-16  bg-gray-100">
//                 <td className="text-center text-2xl font-semibold text-green-600">
//                   Total Price:
//                 </td>

//                 <td className="text-xl font-bold text-green-700">
//                   {totalPrice} EGP
//                 </td>

//                 <td></td>

//            <td className="text-right pr-4" colSpan={3}>
//   <button
//     onClick={clearAllCart}
//     className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition duration-300 mr-4"
//   >
//     Clear Cart
//   </button>

//   <Link
//     to="/checkout"
//     className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition duration-300 inline-block text-center"
//   >
//     Check Out
//   </Link>
// </td>

//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }







// import React, { useContext, useEffect, useState } from "react";
// import "./Cart.module.css";
// import { CartContext } from "../../Context/CartContext";
// import Loader from "../Loader/Loader";
// import { Link, useOutletContext } from "react-router-dom";
// import emptyCart from "../../assets/emptyCart.png";

// export default function Cart() {
//   const {
//     cartItems,
//     getCart,
//     removeCartItem,
//     updateCart,
//     totalPrice,
//     clearCart,
//   } = useContext(CartContext);

//   const [isLoading, setIsLoading] = useState(true);

//   // ✅ Access Layout's context (to hide/show footer)
//   const { setIsPageLoading } = useOutletContext();

//   async function getAllCart() {
//     setIsLoading(true);
//     setIsPageLoading(true); // 🔥 hide footer
//     await getCart();
//     setIsLoading(false);
//     setIsPageLoading(false); // ✅ show footer again
//   }

//   async function removeProduct(productId) {
//     await removeCartItem(productId);
//   }

//   async function clearAllCart() {
//     await clearCart();
//   }

//   async function updateCartProduct(productId, count) {
//     if (count < 1) {
//       await removeProduct(productId);
//       return;
//     }
//     await updateCart(productId, count);
//   }

//   useEffect(() => {
//     getAllCart();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-60">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto my-10 px-4">
//       {cartItems.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-20 text-gray-500">
//           <img className="w-[220px]" src={emptyCart} alt="" />
//           <p className="text-2xl font-semibold">Your cart is empty</p>
//           <p className="text-base mt-2">Add items to get started!</p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto bg-white rounded-lg shadow-md p-6">
//           <table className="table-auto w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100 text-center align-middle">
//                 <th className="py-3 px-2">Product Image</th>
//                 <th className="py-3 px-2">Product Name</th>
//                 <th className="py-3 px-2">Quantity</th>
//                 <th className="py-3 px-2">Unit Price</th>
//                 <th className="py-3 px-2">Total Price</th>
//                 <th className="py-3 px-2">Methods</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr
//                   key={item?.product?.id}
//                   className="text-center align-middle border-b hover:bg-gray-50"
//                 >
//                   <td className="py-4">
//                     <div className="flex justify-center">
//                       <div className="w-[80px] h-[80px]">
//                         <img
//                           src={item.product.imageCover}
//                           className="w-full h-full object-cover rounded-md shadow-sm"
//                           alt="Product"
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-4 font-medium">{item?.product?.title}</td>
//                   <td className="py-4">
//                     <div className="flex items-center justify-center space-x-4">
//                       <button
//                         onClick={() =>
//                           updateCartProduct(item?.product?.id, item.count + 1)
//                         }
//                         className="bg-main-color text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition duration-300"
//                       >
//                         +
//                       </button>
//                       <span className="text-base font-medium">
//                         {item.count}
//                       </span>
//                       <button
//                         onClick={() =>
//                           updateCartProduct(item?.product?.id, item.count - 1)
//                         }
//                         className="bg-main-color text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition duration-300"
//                       >
//                         -
//                       </button>
//                     </div>
//                   </td>
//                   <td className="py-4">{item?.price} EGP</td>
//                   <td className="py-4">{item?.price * item.count} EGP</td>
//                   <td className="py-4">
//                     <button
//                       onClick={() => removeProduct(item?.product?.id)}
//                       className="text-red-500 hover:text-red-600 cursor-pointer px-3 py-2 transition duration-300"
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {/* Total Price Row */}
//               <tr className="h-16 bg-gray-100">
//                 <td className="text-center text-2xl font-semibold text-green-600">
//                   Total Price:
//                 </td>
//                 <td className="text-xl font-bold text-green-700">
//                   {totalPrice} EGP
//                 </td>
//                 <td></td>
//                 <td className="text-right pr-4" colSpan={3}>
//                   <button
//                     onClick={clearAllCart}
//                     className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition duration-300 mr-4"
//                   >
//                     Clear Cart
//                   </button>

//                   <Link
//                     to="/checkout"
//                     className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition duration-300 inline-block text-center"
//                   >
//                     Check Out
//                   </Link>
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
import "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import Loader from "../Loader/Loader";
import { Link, useOutletContext } from "react-router-dom";
import emptyCart from "../../assets/emptyCart.png";

export default function Cart() {
  const {
    cartItems,
    getCart,
    removeCartItem,
    updateCart,
    totalPrice,
    clearCart,
  } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(true);
  const { setIsPageLoading } = useOutletContext();

  async function getAllCart() {
    setIsLoading(true);
    setIsPageLoading(true);
    await getCart();
    setIsLoading(false);
    setIsPageLoading(false);
  }

  async function removeProduct(productId) {
    await removeCartItem(productId);
  }

  async function clearAllCart() {
    await clearCart();
  }

  async function updateCartProduct(productId, count) {
    if (count < 1) {
      await removeProduct(productId);
      return;
    }
    await updateCart(productId, count);
  }

  useEffect(() => {
    getAllCart();
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
    <div className="container mx-auto px-6 lg:px-12 my-16">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <img className="w-[240px] mb-4" src={emptyCart} alt="" />
          <p className="text-2xl font-semibold">Your cart is empty</p>
          <p className="text-base mt-2">Add items to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT SIDE - CART ITEMS */}
          <div className="lg:col-span-2 space-y-8">
            {cartItems.map((item) => (
              <div
                key={item?.product?.id}
                className="flex items-center gap-6 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                {/* Product Image (Clickable) */}
                <Link to={`/product/${item?.product?.id}`}>
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-28 h-28 object-cover rounded-md cursor-pointer"
                  />
                </Link>

                {/* Product Details (Clickable Title) */}
                <div className="flex-1">
                  <Link to={`/product/${item?.product?.id}`}>
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 hover:text-green-600 transition">
                      {item?.product?.title}
                    </h3>
                  </Link>
                  <p className="text-gray-500 mt-1">{item?.price} EGP</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-4 space-x-3">
                    <button
                      onClick={() =>
                        updateCartProduct(item?.product?.id, item.count - 1)
                      }
                      className="bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center text-lg"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">{item.count}</span>
                    <button
                      onClick={() =>
                        updateCartProduct(item?.product?.id, item.count + 1)
                      }
                      className="bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price & Remove */}
                <div className="flex flex-col items-end">
                  <p className="text-green-600 font-bold text-lg">
                    {item?.price * item.count} EGP
                  </p>
                  <button
                    onClick={() => removeProduct(item?.product?.id)}
                    className="text-red-500 hover:text-red-600 mt-3 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="bg-white rounded-lg shadow-md p-8 h-fit">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{totalPrice} EGP</span>
            </div>

            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">Free</span>
            </div>

            <div className="flex justify-between text-lg font-semibold border-t pt-5">
              <span>Total</span>
              <span className="text-green-600">{totalPrice} EGP</span>
            </div>

            <button
              onClick={clearAllCart}
              className="w-full bg-red-500 cursor-pointer hover:bg-red-600 text-white py-2 rounded-md mt-8 transition"
            >
              Clear Cart
            </button>

            <Link
              to="/checkout"
              className="block text-center w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md mt-5 font-medium transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
