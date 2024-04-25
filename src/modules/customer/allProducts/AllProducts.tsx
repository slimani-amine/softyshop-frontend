import { useEffect, useState } from 'react';
import Product from '../home/components/Product/Product';
import { useAppDispatch } from '@src/modules/shared/store';
import { settProducts } from '../data/productSlice';
import { BASE_URL } from '@src/modules/auth/data/authThunk';
import { ProductType } from '../data/dataTypes';

function AllProducts() {
  // const fake_URL = 'http://localhost:3001/products';
  const [Products, setProducts] = useState([]);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
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
          setNumberOfProducts(data.data.meta.totalRecords);
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

  console.log('🚀 ~ AllProducts ~ numberOfProducts:', numberOfProducts);
  return (
    <div className="home">
      {Products?.map(
        (
          {
            id,
            name,
            images,
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
            images={images}
          />
        )
      )}
    </div>
  );
}

export default AllProducts;
