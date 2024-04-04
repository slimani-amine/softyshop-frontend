import { useEffect, useState } from 'react';
import Product from '../home/components/Product/Product';
import {
  // useNavigate,
  useParams,
} from 'react-router-dom';
import { BASE_URL } from '@src/modules/auth/data/authThunk';
import { ReactComponent as PhoneIcon } from '../../shared/assets/icons/store/phone.svg';
import { ReactComponent as LocationIcon } from '../../shared/assets/icons/store/location.svg';
import { ReactComponent as FacebookIcon } from '../../shared/assets/icons/store/facebook.svg';
import { ReactComponent as XIcon } from '../../shared/assets/icons/store/x.svg';
import { ReactComponent as YoutubeIcon } from '../../shared/assets/icons/store/youtube.svg';
import { ReactComponent as InstagramIcon } from '../../shared/assets/icons/store/instagram.svg';
import Button from '@src/modules/shared/components/Button/Button';

function storeDetails() {
  // const FAKE_URL = 'http://localhost:3001/stores?_embed=products';
  // const navigate = useNavigate();
  const { storeId } = useParams();
  const [store, setStore] = useState({
    id: 0,
    name: '',
    phoneNumber: 0,
    logo: '',
    isPublished: false,
    location: '',
    address: '',
    socialMediaLinks: '',
    deletedAt: null,
    createdAt: '',
    updatedAt: '',
    user: null,
  });

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

  // console.log(store);

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
      <div className="store-card-identification">
        <div className="background-image"></div>
        <div className="photo-and-info">
          <div className="store-profile-photo-wrapper">
            <img
              className="store-profile-photo"
              src={store.logo}
              height={110}
              width={110}
              alt=""
            />
          </div>
          <div className="store-info">
            <div className="store-name-and-media">
              <h2 className="store-name">{store.name}</h2>
              <div className="social-media">
                <FacebookIcon />
                <XIcon />
                <YoutubeIcon />
                <InstagramIcon />
              </div>
            </div>
            <div className="store-contact">
              <div className="store-phone-and-location">
                <div className="store-location">
                  <LocationIcon className="location-icon" />{' '}
                  <p className="location">{store.address}</p>
                </div>
                <div className="store-location">
                  <PhoneIcon className="phoneIcon" />{' '}
                  <p className="location">(+216) {store.phoneNumber}</p>
                </div>
              </div>
              <div className="contact-button">
                <Button label={'Contact Vendor'} />
              </div>
            </div>
          </div>
        </div>
      </div>
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
