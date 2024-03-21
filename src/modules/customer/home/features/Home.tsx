import Product from '../components/Product/Product';
import { useEffect, useState } from 'react';
import Store from '../components/Store/Store';
// import { fetchStores } from '../../data/storeSlice';
// import { useAppDispatch } from '@src/modules/shared/store';

function Home() {
  const fake_URL = 'http://localhost:3002/stores';
  // const dispatch = useAppDispatch();
  const [Stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${fake_URL}`);
        const data = await response.json();
        setStores(data);
      } catch (err: string | unknown) {
        console.log(err);
        return err;
      }
    };

    fetchData();
  }, [fake_URL]);

  // useEffect(
  //   function () {
  //     // localStorage.setItem(
  //     //   'accessToken',
  //     //   'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTEwMDY0ODAsImlzcyI6IlNvZnR5U2hvcFRlYW0iLCJhdWQiOiJTb2Z0eVNob3BUZWFtIiwiaXNWZXJpZmllZCI6dHJ1ZSwic3ViIjoiMzVmZTliMjQtNWI2NS00MDg3LWIwNzktMDU5YWExYWVhNDEzIiwicm9sZSI6InVzZXIiLCJleHAiOjE3MTg3ODI0ODB9.cz4if4-D1XbJLGGWg7BEtWA49_6nqU20RU63_FlU8PVW2kgZ8pfeElwdA-kqHnW3FnrQ5JWinCBZ3lPjGMhOx1SFarh7JNWJrbWKXzpgqKxzwAqNH9UxAU5ck1ZJx748FpYqsaxiGwMhkA_mn38vkB_lvykEFHTwSkfq--s71picMjb1e_7YV0230SZ_Wh4uqnyVCjfgqj0E__-MDr5xO1WCcGkeajCGs4jbga5OlmDfjaPZ3OOEWZwZ-HTmXNqldmCGdGrVSU2wYQ47RaBIZlpHLbd850BcoRKvLSlOVpBskbwP0AhJKhAU4YFuPvslpo5H98tGFM5iCXfb0lnEghsylscwZ6q5W4yqcjSJ-7FEtm8mOj-SgSZkWOJaRoV0azgJ9Sq21BzPhYUO7OYtCh_7Vv0iML9CQhdky0gxDylR0umzlBFL70HYHDAQuieZrYowybvKm6NjwYwv4qmsuHqJghb5r6CxQoSKlwWSBfVJcXAKcR1LoD_jc6Q1NSMCHv18tlqUKzkw1MSyGkd7N_1FQOCWc5sZMZRKSilKlxgP4Bp8_nqoFe5fSIMwM8UeyO6Bd3sddWMY09hoc1OJwyxVeSfA-dw9sHPUSEZk6JW-9SSsV-enzI8ZQExWl-4TOf7MLJvCrFMg3fF0-1a12A4mxpSVwve1CsdosG_oAYw'
  //     // );
  //     // dispatch(fetchStores());
  //     // console.log('Hello');
  //   },
  //   [dispatch]
  // );

  // console.log(Products);
  return (
    <div className="home">
      {Stores?.map(({ name, logo, phoneNumber, address }, index) => (
        <Store
          key={index}
          name={name}
          address={address}
          phoneNumber={phoneNumber}
          logo={logo}
        />
      ))}
    </div>
  );
}

export default Home;
