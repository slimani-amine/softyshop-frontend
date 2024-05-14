import { useEffect, useState } from "react";
import Product from "../home/components/Product/Product";
import { useAppDispatch, useAppSelector } from "@src/modules/shared/store";
import { settProducts } from "../data/productSlice";
import { BASE_URL } from "@src/modules/auth/data/authThunk";
import { ProductType } from "../data/dataTypes";

function AllProducts() {
  const [Products, setProducts] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}api/products?perPage=999999999999&page=1`
        );
        const data = await response.json();
        setProducts(
          data.data.docs.map((product: ProductType) => {
            return { ...product, quantity: 0 };
          })
        );
      } catch (err: string | unknown) {
        return err;
      }
    };

    fetchData();
  }, [BASE_URL]);
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

  const publishedProducts = updatedProducts.filter((product: any) => {
    return product.isPublished;
  });

  dispatch(settProducts(publishedProducts));

  return (
    <div className="home">
      {updatedProducts?.map(
        (
          {
            availability,
            id,
            name,
            images,
            //  rating
            price,
            stockNumber,
            quantity,
          },
          index
        ) => (
          <Product
            availability={availability}
            id={id}
            key={index}
            name={name}
            // rating={rating}
            price={price}
            stockNumber={stockNumber}
            images={images}
            quantity={quantity}
          />
        )
      )}
    </div>
  );
}

export default AllProducts;
