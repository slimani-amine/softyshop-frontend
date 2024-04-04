import { useEffect, useState } from 'react';
import Product from '../home/components/Product/Product';
import { BASE_URL } from '@src/modules/auth/data/authThunk';

function AllProducts() {
  // const fake_URL = 'http://localhost:3001/products';
  // const dispatch = useAppDispatch();
  const [Products, setProducts] = useState([]);

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          // const response = await fetch(`${fake_URL}`);
          const response = await fetch(`${BASE_URL}api/products`);
          const data = await response.json();
          setProducts(data.data.docs);
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

  // console.log(Products);

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
