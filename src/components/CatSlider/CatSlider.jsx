import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function CatSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    pauseOnFocus: false,
  };

  function getCatSlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data } = useQuery({
    queryKey: ["catSlider"],
    queryFn: getCatSlider,
  });

  const catSlider = data?.data?.data;

  return (
    <div className="w-full overflow-hidden my-10">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Shop Popular Categories
      </h1>

      <div className="px-16 shadow-2xl">
        <Slider {...settings}>
          {catSlider?.map((cat) => (
            <div
              key={cat._id}
              className="w-full flex items-center justify-center"
            >
              {/* ✅ Wrap with Link */}
              <Link
                to={`/categoryDetails/${cat._id}`}
                className="w-[180px] h-[260px] flex flex-col items-center justify-between bg-white rounded-lg shadow-md hover:shadow-xl border-2 border-transparent hover:border-green-700 transition-all duration-500 ease-in-out group overflow-hidden"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-[200px] object-cover bg-white transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="w-full h-[60px] bg-gray-100 flex items-center justify-center">
                  <p className="text-center text-gray-800 font-semibold text-base group-hover:text-green-700 transition-colors duration-500 ease-in-out">
                    {cat.name}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
