import { GALLERY } from "@/utils/constant";
import React from "react";

function Gallery() {
  return (
    <section id="gallery" className="py-20 dark:bg-[#111827] dark:text-white">
      <div className="mx-auto text-center mb-12">
        <h2 className="text-4xl font-inter font-bold border-b-4 border-blue-600 inline-block pb-2">
          Thư viện ảnh
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 mx-auto">
        {GALLERY.map((image, index) => (
          <div key={index} className="relative overflow-hidden group">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-96 object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="text-white text-lg font-bold">{image.alt}</span>
            </div> */}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
