import React from "react";

function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-gray-100 py-20 dark:bg-[#1F2937] dark:text-white"
    >
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold border-b-4 border-blue-600 inline-block pb-2">
          Thư viện ảnh
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 container mx-auto">
        {[
          {
            src: "https://www.abbottlyon.com/cdn/shop/articles/Cleaning_Storing.webp?v=1711559657",
            alt: "Jewelry 1",
          },
          {
            src: "https://ae01.alicdn.com/kf/H03dc1794212646638354dd5a9784ed15w/Magic-spell-ring-2021-new-feng-shui-amulet-wealth-lucky-adjustable-ring-Buddhist-jewelry-gifts-for.jpg",
            alt: "Jewelry 2",
          },
          {
            src: "https://jdmis.edu.sg/cache/mod_roksprocket/85dfa29b62acd4714e0d160359de8a91_400_400.png",
            alt: "Jewelry 3",
          },
        ].map((image, index) => (
          <div key={index} className="relative overflow-hidden group">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="text-white text-lg font-bold">{image.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
