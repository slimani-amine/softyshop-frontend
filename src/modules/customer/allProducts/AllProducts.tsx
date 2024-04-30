import { useEffect, useState } from 'react';
import Product from '../home/components/Product/Product';
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import { settProducts } from '../data/productSlice';
import { BASE_URL } from '@src/modules/auth/data/authThunk';
import { ProductType } from '../data/dataTypes';

function AllProducts() {
  // const fake_URL = 'http://localhost:3001/products';
  const [Products, setProducts] = useState([]);
  // const [numberOfProducts, setNumberOfProducts] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${BASE_URL}api/products?perPage=100&page=1`
          );
          const data = await response.json();
          // console.log('🚀 ~ fetchData ~ data:', data);
          // const { totalRecords: numberOfProducts } = data.data.meta;
          setProducts(
            data.data.docs.map((product: ProductType) => {
              return { ...product, quantity: 0 };
            })
          );
          // setNumberOfProducts(data.data.meta.totalRecords);
        } catch (err: string | unknown) {
          console.log(err);
          return err;
        }
      };

      fetchData();
    },
    // [fake_URL]
    [BASE_URL]
  );

  // const products = useAppSelector((state) => state.product.products);
  // console.log(products);

  // console.log(cart, Products);
  const cart = useAppSelector((state) => state.cart.cart);
  const updatedProducts = Products.map((product: any) => {
    const updatedProduct = cart.find((item) => item.product.id === product.id);
    if (updatedProduct) {
      // console.log(updatedProduct);
      return { ...product, quantity: updatedProduct.quantity };
    } else return product;
  });
  // console.log(updatedProducts);
  dispatch(settProducts(updatedProducts));

  // dispatch(updateQuantity);

  // console.log('🚀 ~ AllProducts ~ numberOfProducts:', numberOfProducts);
  return (
    <div className="home">
      {updatedProducts?.map(
        (
          {
            id,
            name,
            images,
            //  rating
            price,
            quantity,
          },
          index
        ) => (
          <Product
            id={id}
            key={index}
            name={name}
            // rating={rating}
            price={price}
            images={images}
            quantity={quantity}
          />
        )
      )}
    </div>
  );
}

export default AllProducts;
