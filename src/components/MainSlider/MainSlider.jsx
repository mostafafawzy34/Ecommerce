import React from "react";
import "./MainSlider.module.css";
import slide1 from "../../assets/slide-1.jpeg";
import slide2 from "../../assets/slide-2.jpg";
import slide3 from "../../assets/slide-3.jpg";
import slide4 from "../../assets/slide-4.jpg";
import slide5 from "../../assets/slide-5.jpg";
import slide6 from "../../assets/slide-6.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,  // ✅ Autoplay doesn’t stop on hover
    pauseOnFocus: false,  // ✅ Autoplay doesn’t stop on focus
    dots: false
  };

  return (
    <div className="container mx-auto py-5 px-4">
      <div className="flex w-full gap-4">
        <div className="w-3/4">
          <Slider {...settings}>
            <div className="rounded-xl overflow-hidden">
              <img src={slide1} className="h-[600px] w-full object-cover" alt="" />
            </div>
            <div className="rounded-xl overflow-hidden">
              <img src={slide2} className="h-[600px] w-full object-cover" alt="" />
            </div>
            <div className="rounded-xl overflow-hidden">
              <img src={slide3} className="h-[600px] w-full object-cover" alt="" />
            </div>
            <div className="rounded-xl overflow-hidden">
              <img src={slide6} className="h-[600px] w-full object-cover" alt="" />
            </div>
          </Slider>
        </div>

        <div className="w-1/4 flex flex-col gap-4">
          <div className="rounded-xl overflow-hidden">
            <img src={slide4} className="h-[295px] w-full object-cover" alt="" />
          </div>
          <div className="rounded-xl overflow-hidden">
            <img src={slide5} className="h-[295px] w-full object-cover" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
