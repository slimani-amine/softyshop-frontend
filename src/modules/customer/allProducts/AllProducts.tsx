import { useEffect, useState } from "react";
import Product from "../home/components/Product/Product";
import { useAppDispatch, useAppSelector } from "@src/modules/shared/store";
import { settProducts } from "../data/productSlice";
import { BASE_URL } from "@src/modules/auth/data/authThunk";
import { ProductType } from "../data/dataTypes";
import { Pagination } from "antd"; // Assuming you're using antd for pagination controls

function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const dispatch = useAppDispatch();
  const Products = useAppSelector((state) => state.product.products);

  const perPage = 6; 

  const fetchData = async (page: number, perPage: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}api/products?isPublished=true&perPage=${perPage}&page=${page}`
      );
      const data = await response.json();
      dispatch(
        settProducts(
          data.data.docs.map((product: ProductType) => {
            return { ...product, quantity: 0 };
          })
        )
      );
      setTotalRecords(data.data.meta.totalRecords);
    } catch (err: string | unknown) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData(currentPage, perPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const cart = useAppSelector((state) => state.cart.cart);
  const updatedProducts = Products.map((product: any) => {
    const updatedProduct = cart.find(
      (item) => item?.product?.id === product?.id
    );
    if (updatedProduct) {
      return { ...product, quantity: updatedProduct.quantity };
    } else {
      return product;
    }
  });

  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      
    }}
  >
    <div
      className="all-products"
      style={{
        display: "flex",
        height: "auto",
      }}
    >
        {updatedProducts?.map(
          (
            {
              availability,
              id,
              name,
              images,
              // rating,
              price,
              stockNumber,
              quantity,
            },
            index
          ) => (
            <Product
              key={index}
              availability={availability}
              id={id}
              name={name}
              // rating={rating}
              price={price}
              stockNumber={stockNumber}
              images={images}
              quantity={quantity}
              // className="product"
            />
          )
        )}
      </div>
      <Pagination
        current={currentPage}
        total={totalRecords}
        pageSize={perPage}
        onChange={handlePageChange}
        style={{
          display: "flex",
          justifyContent: "end",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      />
    </div>
  );
}

export default AllProducts;
