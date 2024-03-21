import Product from '../components/Product';
import { useEffect, useState } from 'react';
import { fetchStores } from '../../data/storeSlice';
import { useAppDispatch } from '@src/modules/shared/store';

function Home() {
  const fake_URL = 'http://localhost:3001/users';
  const dispatch = useAppDispatch();
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${fake_URL}`);
        const data = await response.json();
        setProducts(data);
      } catch (err: string | unknown) {
        console.log(err);
        return err;
      }
    };

    fetchData();
  }, [fake_URL]);

  useEffect(
    function () {
      dispatch(fetchStores());
      // console.log('Hello');
    },
    [dispatch]
  );

  // console.log(Products);
  return (
    <div className="home">
      {Products?.map(({ name, image, rating, price }, index) => (
        <Product
          key={index}
          name={name}
          rating={rating}
          price={price}
          image={image}
        />
      ))}
    </div>
  );
}

export default Home;
