import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from 'react-icons/rx';

export const CarouselOfPhoto = () => {
  const slides = [
    {
      url: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/4z9B7h4oUWj8HukDSGQDWN/00e6e1d35abf59340dc20f52e13765b4/GettyImages-1174452698.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000&h=",
    },
    {
      url: "https://cdn-aekfi.nitrocdn.com/BhHUnZmQXkWPzBaLMaTftVhEvszyNTtP/assets/images/source/rev-50d788e/www.timedoctor.com/blog/images/2022/12/employee-monitoring-software1-1920x1080.jpg.webp",
    },
    {
      url: "https://hrmasia.com/wp-content/uploads/2020/01/120920463_m.jpg",
    },
    {
      url: "https://resources.workable.com/wp-content/uploads/2023/05/Rob-Long-employee-satisfaction-vs-happiness.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex)
  }


  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <div className="max-w-[95%] h-[97vh] w-full m-auto py-5 px-4 relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-top bg-contain bg-no-repeat duration-500"
      ></div>
      <div className="hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
            <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className="text-2xl cursor-pointer">
                <RxDotFilled/>
            </div>
        ))}
      </div>
    </div>
  );
};
