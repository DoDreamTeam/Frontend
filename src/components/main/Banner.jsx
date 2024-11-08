import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner1 from '../../assets/banner1.png';
import banner2 from '../../assets/banner2.png';
import banner3 from '../../assets/banner3.png';

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
          <img
            src={banner1}
            alt="Banner 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="bg-gray-300 flex items-center justify-center h-96 rounded-lg">
          <img
            src={banner2}
            alt="Banner 2"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="bg-gray-300 flex items-center justify-center h-96 rounded-lg">
          <img
            src={banner3}
            alt="Banner 3"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
