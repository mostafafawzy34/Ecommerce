// import React from 'react'
// import './Home.module.css'
// import FeatureProducts from '../FeatureProducts/FeatureProducts'
// import MainSlider from '../MainSlider/MainSlider'
// import CatSlider from '../CatSlider/CatSlider'

// export default function Home() {
//   return (
//     <>
//     <MainSlider />
//     <CatSlider  />
//      <FeatureProducts />
//     </>
    
//   )
// }
import React, { useEffect, useState } from "react";
import "./Home.module.css";
import FeatureProducts from "../FeatureProducts/FeatureProducts";
import MainSlider from "../MainSlider/MainSlider";
import CatSlider from "../CatSlider/CatSlider";
import Loader from "../Loader/Loader";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { setIsPageLoading } = useOutletContext();

  useEffect(() => {
    setIsLoading(true);
    setIsPageLoading(true); // 🔥 hide footer while loading

    // fake loading to simulate fetch (since Home doesn’t call API directly)
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsPageLoading(false); // ✅ show footer again
    }, 800); // adjust to match real fetch time

    return () => clearTimeout(timer);
  }, []);

  // ✅ Loader screen (no footer/content)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <MainSlider />
      <CatSlider />
      <FeatureProducts />
    </>
  );
}
