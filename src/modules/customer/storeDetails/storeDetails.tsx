import { useEffect, useState } from 'react';
import Product from '../home/components/Product/Product';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '@src/modules/auth/data/authThunk';
import { ReactComponent as PhoneIcon } from '../../shared/assets/icons/store/phone.svg';
import { ReactComponent as LocationIcon } from '../../shared/assets/icons/store/location.svg';
import { ReactComponent as FacebookIcon } from '../../shared/assets/icons/store/facebook.svg';
import { ReactComponent as XIcon } from '../../shared/assets/icons/store/x.svg';
import { ReactComponent as YoutubeIcon } from '../../shared/assets/icons/store/youtube.svg';
import { ReactComponent as InstagramIcon } from '../../shared/assets/icons/store/instagram.svg';
import Button from '@src/modules/shared/components/Button/Button';
import { ProductType } from '../data/dataTypes';
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import { settProducts } from '../data/productSlice';

function storeDetails() {
  const FAKE_URL = 'http://localhost:3001/stores?_embed=products';

  const dispatch = useAppDispatch();
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
      images: '',
      rating: '',
      price: '',
    },
  ]);

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${FAKE_URL}`);
          // const response = await fetch(`${BASE_URL}api/stores/${storeId}`);
          const data = await response.json();
          setStore(data.data);
        } catch (err: string | unknown) {
          console.log(err);
          return err;
        }
      };

      fetchData();
    },
    [FAKE_URL]
    // [BASE_URL]
  );

  // console.log(store);

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          // const response = await fetch(`${FAKE_URL}`);
          const response = await fetch(
            `${BASE_URL}api/stores/${storeId}/products?page=1`
          );
          const data = await response.json();
          // console.log(data.data);
          setProducts(
            data.data.map((product: ProductType) => {
              return { ...product, quantity: 0 };
            })
          );
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

  dispatch(settProducts(products));
  const cart = useAppSelector((state) => state.cart.cart);
  const theProducts = useAppSelector((state) => state.product.products);

  theProducts.map(function (product) {
    return cart.filter(function (item) {
      console.log(item.product.id, product.id);
      return item.product.id == product.id;
    });
  });
  // console.log(cart, products);
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
                <a href="#">
                  <FacebookIcon className="icon" />
                </a>
                <a href="#">
                  <XIcon className="icon" />
                </a>
                <a href="#">
                  <YoutubeIcon className="icon" />
                </a>
                <a href="#">
                  <InstagramIcon className="icon" />
                </a>
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
              images,
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
                image={images}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
export default storeDetails;
