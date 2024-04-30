import { useEffect, useState } from 'react';
import Store from '../components/Store/Store';
import { BASE_URL } from '@src/modules/auth/data/authThunk';
import { useAppSelector } from '@src/modules/shared/store';
import { Navigate } from 'react-router-dom';

function Home() {
  const user = useAppSelector((state) => state.auth.user);

  const [Stores, setStores] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/stores`);
        const data = await response.json();
        setStores(data.data.docs);
      } catch (err: string | unknown) {
        console.log(err);
        return err;
      }
    };

    fetchData();
  }, [BASE_URL]);

  return (
    <>
      {user?.role === 'user' && <Navigate to="/home" />}
      {user?.role === 'vendor' && <Navigate to="/categories" />}
      <div className="home">
        {Stores?.map(
          (
            {
              name,
              logo,
              phoneNumber,
              address,
              id,
              isPublished,
              location,
              socialMediaLinks,
            },
            index
          ) => (
            <Store
              key={index}
              id={id}
              name={name}
              address={address}
              phoneNumber={phoneNumber}
              logo={logo}
              isPublished={isPublished}
              location={location}
              socialMediaLinks={socialMediaLinks}
            />
          )
        )}
      </div>
    </>
  );
}

export default Home;
