import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "https://i.pinimg.com/1200x/bb/67/05/bb6705f8c5cb39c9ec78c57bdd30a912.jpg",
  "https://i.pinimg.com/736x/91/19/1c/91191c412c5217ab6b4504083c6284b5.jpg",
  "https://i.pinimg.com/736x/7b/9c/6e/7b9c6ea0236913325a3fb9a95d78eaba.jpg"
];

export default function Hero() {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1200,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true
  };

  return (
    <div className="relative text-center px-6 py-20">
      <Slider {...settings} className="absolute inset-0 w-full h-full z-0">
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[600px] object-cover opacity-80"
            />
          </div>
        ))}
      </Slider>

      <div className="relative z-10 text-pink-500 max-w-3xl mx-auto pt-20">
        <h2 className="text-5xl md:text-6xl font-bold ">
          Plan Your Dream Wedding Effortlessly
        </h2>
        <p className="text-lg mt-4 text-pink-500 ">
          For both planners and couples — customize and celebrate your perfect day with grace.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="mt-6 bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition duration-300"
        >
          Start Planning
        </button>
      </div>
    </div>
  );
}
