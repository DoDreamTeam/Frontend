import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner4 from '../../assets/banner4.png';
import banner5 from '../../assets/banner5.png';

const StudyBanner = () => {
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
            src={banner4}
            alt="Banner 4"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="bg-gray-300 flex items-center justify-center h-96 rounded-lg">
          <img
            src={banner5}
            alt="Banner 5"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Slider>
    </div>
  );
};

export default StudyBanner;
