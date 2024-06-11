import { ProductCard } from "@/components/ProductCard";
import { RING_LIST } from "@/utils/constant";
import React from "react";
import { Link } from "react-router-dom";

const TrangSuc = () => {
  return (
    <section>
      <div className="py-20 text-center font-bold text-3xl">
        <h1 className="mb-4">Nhẫn</h1>
        <div className="container  mx-auto flex flex-wrap gap-8 justify-center">
          {RING_LIST.map((product) => (
            <ProductCard
              key={product.id}
              link={`/trang-suc/${product.id}/${product.productID}`}
              {...product}
            />
          ))}
        </div>
      </div>
      {/* <div className="py-20 text-center font-bold text-3xl">
        <h1 className="mb-4">Bông tai</h1>
        <div className="container mx-auto flex flex-wrap gap-8 justify-center">
          {RING_LIST.map((product) => (
            <Link
              key={product.id}
              to={`/trang-suc/${product.id}/${product.productID}`}
            >
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      </div> */}
    </section>
  );
};

export default TrangSuc;
