import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner6 from '../../assets/banner6.png';
import banner7 from '../../assets/banner7.png';

const BookBanner = () => {
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
    <div className="w-[1200px] max-w-screen-lg mx-auto mb-10">
      <Slider {...settings}>
        <div className="bg-gray-300 flex items-center justify-center h-96 rounded-lg">
          <img
            src={banner6}
            alt="Banner 6"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="bg-gray-300 flex items-center justify-center h-96 rounded-lg">
          <img
            src={banner7}
            alt="Banner 7"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Slider>
    </div>
  );
};

export default BookBanner;
