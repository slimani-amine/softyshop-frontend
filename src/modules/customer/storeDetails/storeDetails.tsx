import { useEffect, useState } from 'react';
import Product from '../home/components/Product/Product';
import {
  // useNavigate,
  useParams,
} from 'react-router-dom';
import { BASE_URL } from '@src/modules/auth/data/authThunk';

function storeDetails() {
  // const FAKE_URL = 'http://localhost:3001/stores?_embed=products';
  // const navigate = useNavigate();
  const { storeId } = useParams();
  const [store, setStore] = useState({});

  const [products, setProducts] = useState([
    {
      id: 0,
      name: '',
      image: '',
      rating: '',
      price: '',
    },
  ]);

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          // const response = await fetch(`${FAKE_URL}`);
          const response = await fetch(`${BASE_URL}api/stores/${storeId}`);
          const data = await response.json();
          setStore(data.data);
        } catch (err: string | unknown) {
          console.log(err);
          return err;
        }
      };

      fetchData();
    },
    // [FAKE_URL]
    [BASE_URL]
  );

  console.log(store);

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          // const response = await fetch(`${FAKE_URL}`);
          const response = await fetch(
            `${BASE_URL}api/stores/${storeId}/products?page=3`
          );
          const data = await response.json();
          // console.log(data.data);
          setProducts(data.data);
        } catch (err: string | unknown) {
          console.log(err);
          return err;
        }
      };

      fetchData();
    },
    // [FAKE_URL]
    [BASE_URL]
  );
  // console.log(products);
  return (
    <div className="home">
      <div className="store-card-identification">I am a store</div>
      <div className="books">
        {products.map(
          (
            {
              id,
              name,
              image,
              //  rating
              price,
            },
            index
          ) => {
            return (
              <Product
                // onClick={() => {
                //   console.log('hello');
                //   navigate(`products/${id}`);
                // }}
                id={id}
                key={index}
                name={name}
                // rating={rating}
                price={Number(price)}
                image={image}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
export default storeDetails;
