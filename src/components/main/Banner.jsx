import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full h-96 mb-10">
      <Slider {...settings}>
        <div className="bg-gray-300 flex items-center justify-center h-96 rounded-lg">
          <h3 className="text-xl font-bold text-center">dodream 서비스 설명</h3>
        </div>
        <div className="bg-gray-300 flex items-center justify-center h-96 rounded-lg">
          <h3 className="text-xl font-bold text-center">문제집 설명</h3>
        </div>
        <div className="bg-gray-300 flex items-center justify-center h-96 rounded-lg">
          <h3 className="text-xl font-bold text-center">스터디 설명</h3>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
