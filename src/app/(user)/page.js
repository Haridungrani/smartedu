"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/carousel-1.jpg",
    title: "Best Online Courses",
    subtitle: "Strive for progress, not for perfection",
  },
  {
    src: "/carousel-2.jpg",
    title: "Best Online Courses",
    subtitle: "Strive for progress, not for perfection",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex">
      {/* Sidebar placeholder */}
      <div className="w-1/6 bg-gray-100 min-h-screen">{/* Sidebar */}</div>

      {/* Main content */}
      <div className="w-5/6 flex justify-center items-center min-h-screen bg-gray-50">
        <div
          className="relative overflow-hidden rounded-lg shadow-lg"
          style={{ width: "1200px", height: "600px" }} // fixed width and height
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={slide.src}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
                <h5 className="text-2xl font-algerian mb-2">{slide.title}</h5>
                <h1 className="text-5xl font-forte mb-6">{slide.subtitle}</h1>
                <Link href="/course">
                  <button className="px-6 py-3 bg-purple-800 rounded-lg text-lg font-forte hover:bg-purple-900 transition">
                    Start learning
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
