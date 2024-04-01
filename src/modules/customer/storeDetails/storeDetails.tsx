import { useEffect, useState } from 'react';
import Product from '../home/components/Product/Product';
import { useParams } from 'react-router-dom';

function storeDetails() {
  const FAKE_URL = 'http://localhost:3001/stores?_embed=products';
  const { storeId } = useParams();
  // console.log(storeId);

  const [stores, setStores] = useState<
    {
      id: string;
      address: string;
      isPublished: number;
      location: string;
      logo: string;
      name: string;
      phoneNumber: string;
      socialMediaLinks: string;
      products: [
        {
          id: number;
          name: string;
          image: string;
          rating: string;
          price: string;
        },
      ];
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${FAKE_URL}`);
        const data = await response.json();
        setStores(data);
      } catch (err: string | unknown) {
        console.log(err);
        return err;
      }
    };

    fetchData();
  }, [FAKE_URL]);
  // console.log(
  //   stores.map((store) => {
  //     if (store.id == storeId) console.log('I am Here');
  //   })
  // );
  return (
    <div className="home">
      {stores
        ?.filter((store) => {
          // console.log('hola');
          return store.id == storeId;
        })
        .map((store) =>
          store.products.map(({ name, image, rating, price }, index) => {
            return (
              <Product
                key={index}
                name={name}
                rating={rating}
                price={Number(price)}
                image={image}
              />
            );
          })
        )}
    </div>
  );
}

export default storeDetails;
