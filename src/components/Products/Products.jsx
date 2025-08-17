import React, { useEffect, useState } from "react";
import "./Products.module.css";
import FeatureProducts from "../FeatureProducts/FeatureProducts";
import Loader from "../Loader/Loader";
import { useOutletContext } from "react-router-dom";

export default function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const { setIsPageLoading } = useOutletContext();

  useEffect(() => {
    setIsLoading(true);
    setIsPageLoading(true); // 🔥 hide footer while loading

    // simulate loading (since FeatureProducts fetches data itself)
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsPageLoading(false); // ✅ show footer again
    }, 800); // adjust if needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <FeatureProducts />
    </>
  );
}
