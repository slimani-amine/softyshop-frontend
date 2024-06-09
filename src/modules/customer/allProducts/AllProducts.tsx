import { useEffect, useState } from "react";
import Product from "../home/components/Product/Product";
import { useAppDispatch, useAppSelector } from "@src/modules/shared/store";
import { setProducts } from "../data/productSlice";
import { BASE_URL } from "@src/modules/auth/data/authThunk";
import { ProductType } from "../data/dataTypes";
import { Pagination } from "antd";
import { useLocation } from "react-router-dom";
import Widget from "../home/components/Widget/Widget";

function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const perPage = 9;
  const { search } = useLocation();

  const fetchData = async (page: number, perPage: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}api/products${
          search ? search + "&" : "?"
        }isPublished=true&perPage=${perPage}&page=${page}`
      );
      const data = await response.json();
      const products = data.data.docs.map((product: ProductType) => ({
        ...product,
        quantity: 0,
      }));
      dispatch(setProducts(products));
      setTotalRecords(data.data.meta.totalRecords);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData(currentPage, perPage);
  }, [currentPage, search]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const cart = useAppSelector((state) => state.cart.cart);
  const updatedProducts = products.map((product) => {
    const cartItem = cart.find((item) => item.product?.id === product?.id);
    return cartItem ? { ...product, quantity: cartItem.quantity } : product;
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0 0 36px 24px",
      }}
    >
      <Widget />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "auto",
          gap: "1rem",
        }}
      >
        {updatedProducts.map((product, index) => (
          <Product
            key={index}
            availability={product.availability}
            id={product.id}
            name={product.name}
            price={product.price}
            stockNumber={product.stockNumber}
            images={product.images}
            quantity={product.quantity}
          />
        ))}
      </div>
      {totalRecords > perPage && (
        <Pagination
          current={currentPage}
          total={totalRecords}
          pageSize={perPage}
          onChange={handlePageChange}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        />
      )}
    </div>
  );
}

export default AllProducts;
