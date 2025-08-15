import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { HeartIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Autoplay } from "swiper/modules"; // ✅ Import Autoplay from modules

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function PGDetails({ pgs }) {
  const { id } = useParams();
  const pg = pgs.find((item) => String(item.id) === id);
  const [saved, setSaved] = useState(false);

  if (!pg)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 dark:text-red-300 text-lg">
        PG not found.
      </div>
    );

  // Fallback: if pg.images doesn't exist, use [pg.img]
  const images = Array.isArray(pg.images) && pg.images.length > 0 ? pg.images : [];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors">
      <section className="max-w-5xl mx-auto py-10 px-4">
        {/* Image Slider */}
        <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            modules={[Autoplay]} // ✅ Register Autoplay module
            autoplay={{
              delay: 3000, // 3 seconds
              disableOnInteraction: false, // keeps autoplay even after user interacts
            }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`${pg.name} - ${index + 1}`}
                  className="w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Rest of your content */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-blue-700 dark:text-yellow-400">
            {pg.name}
          </h2>
          <button
            onClick={() => setSaved(!saved)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
            title={saved ? "Saved" : "Save PG"}
          >
            <HeartIcon
              className={`h-6 w-6 ${saved ? "text-red-500" : "text-gray-500 dark:text-yellow-300"
                }`}
            />
          </button>
        </div>

        {/* PG Info */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5" />
            <span className="text-base">{pg.location}</span>
          </div>
          <div>
            Price: <span className="font-medium">{pg.price}</span>
          </div>
          <div>
            Gender: <span className="font-medium">{pg.gender}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-6">
          {pg.amenities.map((a) => (
            <span
              key={a}
              className="bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-yellow-300 px-3 py-1 rounded-full text-sm"
            >
              {a}
            </span>
          ))}
        </div>

        {/* Contact Button */}
        <button
          onClick={() =>
            window.open(
              `mailto:contact@pgfinder.com?subject=Enquiry about ${pg.name}`
            )
          }
          className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-yellow-500 dark:to-yellow-700 text-white dark:text-gray-900 px-6 py-3 rounded-xl shadow hover:scale-105 transition"
        >
          Contact
        </button>

        {/* Google Map */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-blue-700 dark:text-yellow-400 mb-2">
            Location on Map
          </h3>
          <div className="overflow-hidden rounded-xl shadow-lg">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                pg.location
              )}&output=embed`}
              width="100%"
              height="300"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              title="PG Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default PGDetails;
