import React from "react";
import { Link } from "react-router-dom";

function Products() {
  return (
    <section className="py-20 px-4 dark:bg-[#1F2937]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold border-b-4 border-blue-600 inline-block pb-2 dark:text-white">
          Sản phẩm của chúng tôi
        </h2>
      </div>
      <div className="container mx-auto flex flex-wrap gap-8 justify-center">
        <ProductCard
          name="Nhẫn cưới vàng bản móc máy Vàng kiểu Ý 750"
          image="https://www.baotinkk.com/cdn/shop/products/NJ190720089_16-20-44_e2570c3d-8c53-418a-898a-67685e2cbcc4_900x.jpg?v=1606914741"
          link={`/trang-suc/ring/NJ190720090`}
        />
        <ProductCard
          name="Nhẫn cưới vàng bản xi cát Bảo Tín K&K Vàng 18K"
          image="https://www.baotinkk.com/cdn/shop/products/NA190308005_16-09-08_543acc70-3ba8-4f6b-916f-759072f62f80_900x.jpg?v=1606913104"
          link={`/trang-suc/ring/NA190308002`}
        />
        <ProductCard
          name="Nhẫn cưới vàng bản xi cát Bảo Tín K&K Vàng 18K"
          image="https://www.baotinkk.com/cdn/shop/products/NA190308005_16-09-08_2fdd6f4e-131c-45c4-bc2c-97a30727042f_900x.jpg?v=1606913101"
          link={`/trang-suc/ring/NA190308002`}
        />
        <ProductCard
          name="Nhẫn cưới vàng bản lông voi Bảo Tín K&K Vàng 18K"
          image="https://www.baotinkk.com/cdn/shop/products/NA190830004_NA190830003_bd6c0777-d4f8-41dc-a92f-dc58cfa87d93_900x.jpg?v=1606914746"
          link={`/trang-suc/ring/NA150821111`}
        />
      </div>
    </section>
  );
}

export default Products;

export function ProductCard({ name, image, link }) {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
      <Link to={link} className="block h-full">
        <div className="bg-white text-center rounded-lg overflow-hidden shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 dark:bg-[#1F2937] dark:text-white h-full">
          <img
            src={image}
            alt="Product"
            className="w-full h-48 sm:h-96 object-cover object-center"
          />
          <div className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">{name}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
