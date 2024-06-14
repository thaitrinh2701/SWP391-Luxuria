import React, { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import axios from "axios";
import { useParams } from "react-router-dom";

const TrangSuc = () => {
  const { categoryId } = useParams(); // Lấy categoryId từ URL
  const [listProducts, setListProducts] = useState([]);
  const API_GET_ALL_PRODUCT = import.meta.env
    .VITE_API_GET_ALL_PRODUCTS_ENDPOINT;

  const getProductsFromAPI = async (categoryId) => {
    try {
      const response = await axios.get(API_GET_ALL_PRODUCT);

      const productsWithImages = response.data.map((item) => {
        const productDataList = item.productDataList;
        let image = "";
        if (productDataList && productDataList.length > 0) {
          const base64Data = productDataList[0]?.value;
          image = base64Data ? `data:image/jpeg;base64,${base64Data}` : "";
        }
        return { ...item, image };
      });

      let filteredProducts = productsWithImages;
      if (categoryId) {
        filteredProducts = productsWithImages.filter(
          (product) => product.product.category.id === parseInt(categoryId)
        );
      }

      // Set filtered products to state
      setListProducts(filteredProducts);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProductsFromAPI(categoryId);
  }, [categoryId]);

  return (
    <section className="">
      <div className="flex min-h-screen">
        <div className="text-center font-bold text-3xl mt-20 mx-auto">
          <h1 className="mb-4">Nhẫn</h1>
          {listProducts.length > 0 ? (
            <div className="flex gap-8">
              {listProducts.map((item) => (
                <ProductCard
                  key={item.product.id}
                  name={item.product.name}
                  image={item.image}
                  link={`/trang-suc/${item.product.category.id}/${item.product.id}`}
                />
              ))}
            </div>
          ) : (
            <p>Không có sản phẩm nào phù hợp.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrangSuc;
