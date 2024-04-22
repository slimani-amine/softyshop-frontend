import { useEffect, useState } from 'react';
import Product from '../home/components/Product/Product';
import { useAppDispatch } from '@src/modules/shared/store';
import { settProducts } from '../data/productSlice';
import { BASE_URL } from '@src/modules/auth/data/authThunk';
import { ProductType } from '../data/dataTypes';

function AllProducts() {
  // const fake_URL = 'http://localhost:3001/products';
  const [Products, setProducts] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          // const response = await fetch(`${fake_URL}`);
          const response = await fetch(`${BASE_URL}api/products`);
          const data = await response.json();
          setProducts(
            data.data.docs.map((product: ProductType) => {
              return { ...product, quantity: 0 };
            })
          );
          // console.log(data);
          // setProducts(data);
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

  // console.log(Products, cart);
  // console.log(Products);
  dispatch(settProducts(Products));
  // const theProducts = useAppSelector((state) => state.product.products);
  // console.log(theProducts);
  // dispatch(updateQuantity);

  return (
    <div className="home">
      {Products?.map(
        (
          {
            id,
            name,
            image,
            //  rating
            price,
          },
          index
        ) => (
          <Product
            id={id}
            key={index}
            name={name}
            // rating={rating}
            price={price}
            image={image}
          />
        )
      )}
    </div>
  );
}

export default AllProducts;
