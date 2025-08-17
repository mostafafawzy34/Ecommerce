// import React, { useContext, useState, useRef, useEffect } from "react";
// import "./Navbar.module.css";
// import logo from "../../assets/freshcart-logo.svg";
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// import { TokenContext } from "../../Context/TokenContext";
// import { CartContext } from "../../Context/CartContext";
// import { WishlistContext } from "../../Context/WishlistContext"; // ✅ Import WishlistContext
// import { FaHeart, FaShoppingCart } from "react-icons/fa";

// export default function Navbar() {
//   const { token, setToken } = useContext(TokenContext);
//   const { numOfCartItems } = useContext(CartContext);
//   const { numOfWishlistItems } = useContext(WishlistContext); // ✅ Get wishlist count
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef();

//   function logOut() {
//     localStorage.removeItem("userToken");
//     setToken(null);
//     navigate("/login");
//   }

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="bg-slate-300 fixed">
//       <div className="navbar px-4 md:px-8 lg:px-12 shadow-sm">
//         <div className="navbar-start" ref={dropdownRef}>
//           <div className="dropdown">
//             <button
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               className="btn btn-ghost lg:hidden"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h8m-8 6h16"
//                 />
//               </svg>
//             </button>

//             {token && isDropdownOpen && (
//               <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 ml-6 mt-3 w-52 p-2 shadow text-lg">
//                 <li>
//                   <NavLink to="/" className="text-xl" onClick={() => setIsDropdownOpen(false)}>
//                     Home
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/products" className="text-xl" onClick={() => setIsDropdownOpen(false)}>
//                     Products
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/categories" className="text-xl" onClick={() => setIsDropdownOpen(false)}>
//                     Categories
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/brands" className="text-xl" onClick={() => setIsDropdownOpen(false)}>
//                     Brands
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </div>

//           <Link to="/">
//             <img src={logo} alt="FreshCart Logo" className="w-42 ml-7" />
//           </Link>
//         </div>

//         {/* MAIN NAVLINKS */}
//         <div className="navbar-center hidden lg:flex">
//           {token && (
//             <ul className="menu menu-horizontal px-1">
//               <li><NavLink to="/" className="text-xl">Home</NavLink></li>
//               <li><NavLink to="/products" className="text-xl">Products</NavLink></li>
//               <li><NavLink to="/categories" className="text-xl">Categories</NavLink></li>
//               <li><NavLink to="/brands" className="text-xl">Brands</NavLink></li>
//             </ul>
//           )}
//         </div>

//         <div className="navbar-end flex items-center gap-6">
//           {token && (
//             <>
//               {/* Wishlist Icon with Counter */}
//               <Link to="/wishlist" className="relative group">
//                 <FaHeart
//                   className={`text-2xl transition-colors duration-300 ${
//                     location.pathname === "/wishlist"
//                       ? "text-red-600"
//                       : "text-gray-700 group-hover:text-red-600"
//                   }`}
//                 />
//                 {numOfWishlistItems > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
//                     {numOfWishlistItems}
//                   </span>
//                 )}
//               </Link>

//               {/* Cart Icon with Counter */}
//               <Link to="/cart" className="relative group">
//                 <FaShoppingCart
//                   className={`text-2xl transition-colors duration-300 ${
//                     location.pathname === "/cart"
//                       ? "text-green-600"
//                       : "text-gray-700 group-hover:text-green-600"
//                   }`}
//                 />
//                 {numOfCartItems > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-[#0aad0a] text-white text-xs rounded-full px-1">
//                     {numOfCartItems}
//                   </span>
//                 )}
//               </Link>
//             </>
//           )}

//           <ul className="menu menu-horizontal px-1">
//             {token ? (
//               <li><a onClick={logOut} className="text-lg">Logout</a></li>
//             ) : (
//               <>
//                 <li><NavLink to="/login" className="text-xl">Login</NavLink></li>
//                 <li><NavLink to="/register" className="text-xl">Register</NavLink></li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useContext, useState, useRef, useEffect } from "react";
import "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const { token, setToken } = useContext(TokenContext);
  const { numOfCartItems } = useContext(CartContext);
  const { numOfWishlistItems } = useContext(WishlistContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-slate-300 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="navbar px-4 md:px-8 lg:px-12">
        <div className="navbar-start" ref={dropdownRef}>
          <div className="dropdown">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="btn btn-ghost lg:hidden cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            {token && isDropdownOpen && (
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 ml-6 mt-3 w-52 p-2 shadow text-lg">
                <li>
                  <NavLink to="/" className="text-xl" onClick={() => setIsDropdownOpen(false)}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products" className="text-xl" onClick={() => setIsDropdownOpen(false)}>
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/categories" className="text-xl" onClick={() => setIsDropdownOpen(false)}>
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/brands" className="text-xl" onClick={() => setIsDropdownOpen(false)}>
                    Brands
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          <Link to="/">
            <img src={logo} alt="FreshCart Logo" className="w-42 ml-7" />
          </Link>
        </div>

        {/* MAIN NAVLINKS */}
        <div className="navbar-center hidden lg:flex">
          {token && (
            <ul className="menu menu-horizontal px-1">
              <li><NavLink to="/" className="text-xl">Home</NavLink></li>
              <li><NavLink to="/products" className="text-xl">Products</NavLink></li>
              <li><NavLink to="/categories" className="text-xl">Categories</NavLink></li>
              <li><NavLink to="/brands" className="text-xl">Brands</NavLink></li>
            </ul>
          )}
        </div>

        <div className="navbar-end flex items-center gap-6">
          {token && (
            <>
              {/* Wishlist Icon with Counter */}
              <Link to="/wishlist" className="relative group">
                <FaHeart
                  className={`text-2xl transition-colors duration-300 ${
                    location.pathname === "/wishlist"
                      ? "text-red-600"
                      : "text-gray-700 group-hover:text-red-600"
                  }`}
                />
                {numOfWishlistItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                    {numOfWishlistItems}
                  </span>
                )}
              </Link>

              {/* Cart Icon with Counter */}
              <Link to="/cart" className="relative group">
                <FaShoppingCart
                  className={`text-2xl transition-colors duration-300 ${
                    location.pathname === "/cart"
                      ? "text-green-600"
                      : "text-gray-700 group-hover:text-green-600"
                  }`}
                />
                {numOfCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#0aad0a] text-white text-xs rounded-full px-1">
                    {numOfCartItems}
                  </span>
                )}
              </Link>
            </>
          )}

          <ul className="menu menu-horizontal px-1">
            {token ? (
              <li><a onClick={logOut} className="text-lg">Logout</a></li>
            ) : (
              <>
                <li><NavLink to="/login" className="text-xl">Login</NavLink></li>
                <li><NavLink to="/register" className="text-xl">Register</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
