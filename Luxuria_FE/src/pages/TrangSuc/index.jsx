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
    .VITE_API_GET_ALL_PRODUCTS_BY_CATEGORY_ENDPOINT;
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const filters = [
    { value: "24k gold", name: "Vàng 24K" },
    { value: "18k gold", name: "Vàng 18K" },
    { value: "16k gold", name: "Vàng 16K" },
    { value: "14k gold", name: "Vàng 14K" },
    { value: "diamond", name: "Kim cương" },
    { value: "colored gemstones", name: "Đá màu" },
    { value: "jade", name: "Ngọc thạch" },
    { value: "pearl", name: "Ngọc trai" },
    { value: "artificial pearl", name: "Ngọc trai nhân tạo" },
  ];

  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = listProducts.filter(
          (item) => item.product.gold.name === selectedCategory
        );
        return temp;
      });
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems([...listProducts]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters, listProducts]);

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

      setListProducts(productsWithImages);
      console.log("Data from API ", productsWithImages);
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
    <section className="container mx-auto p-4 mb-8 dark:bg-gray-900">
      <div className="flex min-h-screen">
        <div className="text-center font-bold text-3xl mt-20 mx-auto dark:text-white">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader />
            </div>
          ) : (
            <>
              {listProducts.length > 0 && (
                <div>
                  <h1 className="mb-4">{categoryName}</h1>

                  <div className="buttons-container flex flex-wrap justify-center mt-5 gap-2">
                    {filters.map((category, idx) => (
                      <button
                        onClick={() => handleFilterButtonClick(category.value)}
                        className={`button border ${
                          selectedFilters?.includes(category.value)
                            ? "active bg-[#1e293b] text-white dark:bg-white dark:text-black"
                            : "bg-transparent dark:bg-gray-800 dark:text-white"
                        } border-black dark:border-white m-1 rounded text-lg p-2 cursor-pointer transition-all duration-200 ease-in-out hover:shadow-[3px_3px_0px_0px_rgba(0,0,0)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255)]`}
                        key={`filters-${idx}`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 dark:bg-gray-900">
                  {filteredItems.map((item) => (
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
                <div className="flex flex-col justify-center items-center">
                  <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png?f=webp"
                    alt="not-found-product"
                    className="w-1/2"
                  />
                  <p className="dark:text-white mt-8">
                    Không có sản phẩm nào phù hợp.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrangSuc;
