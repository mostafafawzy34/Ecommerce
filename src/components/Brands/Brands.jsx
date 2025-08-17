// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getBrands } from '../../Redux/ProductSlice';
// import { Link } from 'react-router-dom';
// import Loader from '../Loader/Loader'; // ✅ Import Loader

// export default function Brands() {
//   const { brands } = useSelector((state) => state.productRed);
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(true); // ✅ Loading state

//   useEffect(() => {
//     async function fetchBrands() {
//       setIsLoading(true);
//       await dispatch(getBrands()); // wait for brands to load
//       setIsLoading(false);
//     }
//     fetchBrands();
//   }, [dispatch]);

//   if (isLoading) {
//     // ✅ Show only loader and hide everything else
//     return (
//       <div className="flex justify-center items-center h-60">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto my-10 px-4">
//       <div className="text-center mb-10">
//         <h2 className="text-4xl md:text-4xl font-extrabold" style={{ color: '#0aad0a' }}>
//           Our Brands
//         </h2>
//         <div className="w-24 h-1 bg-[#0aad0a] mx-auto mt-3 rounded-full"></div>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {brands.map((brand) => (
//           <Link to={`/brandDetails/${brand._id}`} key={brand._id}>
//             <div
//               className="group bg-white rounded-2xl border-2 border-transparent hover:border-[#0aad0a] shadow-sm hover:shadow-xl p-5 flex flex-col items-center transition-all duration-500 ease-in-out cursor-pointer"
//             >
//               <div className="w-24 h-24 flex items-center justify-center mb-4">
//                 <img
//                   src={brand.image}
//                   alt={brand.name}
//                   className="h-full w-auto object-contain transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
//                 />
//               </div>
//               <h5 className="text-lg font-semibold text-gray-800 transition-colors duration-500 ease-in-out group-hover:text-[#0aad0a]">
//                 {brand.name}
//               </h5>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../Redux/ProductSlice";
import { Link, useOutletContext } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function Brands() {
  const { brands } = useSelector((state) => state.productRed);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Access Layout's context
  const { setIsPageLoading } = useOutletContext();

  useEffect(() => {
    async function fetchBrands() {
      setIsLoading(true);
      setIsPageLoading(true); // 🔥 hide footer
      await dispatch(getBrands());
      setIsLoading(false);
      setIsPageLoading(false); // ✅ show footer again
    }
    fetchBrands();
  }, [dispatch, setIsPageLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4 ">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-4xl font-extrabold" style={{ color: "#0aad0a" }}>
          Our Brands
        </h2>
        <div className="w-24 h-1 bg-[#0aad0a] mx-auto mt-3 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Link to={`/brandDetails/${brand._id}`} key={brand._id}>
            <div className="group bg-white rounded-2xl border-2 border-transparent hover:border-[#0aad0a] shadow-sm hover:shadow-xl p-5 flex flex-col items-center transition-all duration-500 ease-in-out cursor-pointer">
              <div className="w-24 h-24 flex items-center justify-center mb-4">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="h-full w-auto object-contain transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
              </div>
              <h5 className="text-lg font-semibold text-gray-800 transition-colors duration-500 ease-in-out group-hover:text-[#0aad0a]">
                {brand.name}
              </h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
