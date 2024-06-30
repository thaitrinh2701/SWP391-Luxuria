import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { convertConstraintName } from "@/services/getHelper";
import { ProductCard } from "@/components/ProductCard";
import { Loader } from "@/components";

const TrangSuc = () => {
  const { categoryId } = useParams();
  const [listProducts, setListProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const API_GET_ALL_PRODUCT = import.meta.env
    .VITE_API_GET_ALL_PRODUCTS_ENDPOINT;

  const getProductsFromAPI = async (categoryId) => {
    try {
      const response = await axios.get(`${API_GET_ALL_PRODUCT}/${categoryId}`);

      const productsWithImages = response.data.map((item) => {
        const productDataList = item.productDataList;
        let image = "";
        if (productDataList && productDataList.length > 0) {
          const base64Data = productDataList[0]?.value;
          image = base64Data ? `data:image/jpeg;base64,${base64Data}` : "";
        }
        return { ...item, image };
      });
      // let filteredProducts = productsWithImages;
      // if (categoryId) {
      //   filteredProducts = productsWithImages.filter(
      //     (product) => product.product.category.id === parseInt(categoryId)
      //   );
      // }
      setListProducts(productsWithImages);
      console.log("Data from api ", productsWithImages);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getProductsFromAPI(categoryId);
  }, [categoryId]);

  useEffect(() => {
    const updateConstraintName = async () => {
      const categoryName = listProducts[0]?.product?.category?.name;
      if (categoryName) {
        const convertedName = await convertConstraintName(categoryName);
        setCategoryName(convertedName);
      }
    };
    updateConstraintName();
  }, [listProducts]);

  return (
    <section className="container mx-auto p-4 mb-8">
      <div className="flex min-h-screen">
        <div className="text-center font-bold text-3xl mt-20 mx-auto dark:text-white">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader />
            </div>
          ) : (
            <>
              {listProducts.length > 0 && (
                <h1 className="mb-4">{categoryName}</h1>
              )}
              {listProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {listProducts.map((item) => (
                    <ProductCard
                      key={item.product.id}
                      name={item.product.name}
                      image={item.image}
                      data={item}
                      link={`/trang-suc/${item.product.category.id}/${item.product.id}`}
                    />
                  ))}
                </div>
              ) : (
                <p>Không có sản phẩm nào phù hợp.</p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrangSuc;
