// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Loader from '../Loader/Loader';

// export default function Categories() {
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState('');

//   async function getCategories() {
//     try {
//       let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
//       setCategories(data.data);
//     } catch (error) {
//       setErrorMsg('Failed to load categories.');
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     getCategories();
//   }, []);

//   return (
//     <div className="container mx-auto my-6 px-4">
//       <div className="text-center mb-6">
//         <h2 className="text-3xl md:text-4xl font-extrabold text-green-700">
//           All Categories
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

//       <div className="flex flex-wrap gap-y-8 gap-x-4 justify-center mt-12">
//         {categories.map((category) => (
//           <Link
//             key={category._id}
//             to={`/categoryDetails/${category._id}`}
//             className="sm:w-[90%] md:w-[45%] lg:w-[30%] xl:w-[23%] px-3"
//           >
//             <div className="group bg-white rounded-xl border-2 border-transparent hover:border-green-700 shadow-md hover:shadow-xl transition-all duration-500 ease-in-out p-5 h-full flex flex-col justify-between cursor-pointer">
//               <img
//                 src={category.image}
//                 alt={category.name}
//                 className="w-full h-[250px] object-cover rounded-lg mb-4 transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
//               />
//               <h3 className="text-gray-800 text-xl font-semibold text-center group-hover:text-green-700 transition-colors duration-500 ease-in-out">
//                 {category.name}
//               </h3>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useOutletContext } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Access Layout's context (to hide footer while loading)
  const { setIsPageLoading } = useOutletContext();

  async function getCategories() {
    try {
      setIsLoading(true);
      setIsPageLoading(true); // 🔥 Hide footer
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    } catch (error) {
      setErrorMsg("Failed to load categories.");
    } finally {
      setIsLoading(false);
      setIsPageLoading(false); // ✅ Show footer again
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

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
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-700">
          All Categories
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

      {/* No Categories Found */}
      {!errorMsg && categories.length === 0 && (
        <div className="flex flex-col items-center justify-center my-24">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6598/6598519.png"
            alt="No Categories"
            className="w-40 h-40 mb-4"
          />
          <p className="text-gray-600 text-lg font-semibold">
            No categories found.
          </p>
        </div>
      )}

      {/* Categories Grid */}
      <div className="flex flex-wrap gap-y-8 gap-x-4 justify-center mt-12">
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/categoryDetails/${category._id}`}
            className="sm:w-[90%] md:w-[45%] lg:w-[30%] xl:w-[23%] px-3"
          >
            <div className="group bg-white rounded-xl border-2 border-transparent hover:border-green-700 shadow-md hover:shadow-xl transition-all duration-500 ease-in-out p-5 h-full flex flex-col justify-between cursor-pointer">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-[250px] object-cover rounded-lg mb-4 transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <h3 className="text-gray-800 text-xl font-semibold text-center group-hover:text-green-700 transition-colors duration-500 ease-in-out">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
