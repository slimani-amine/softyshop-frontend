import { useEffect, useState } from 'react';
// import Product from '../home/components/Product/Product';
import { ReactComponent as PhoneIcon } from "../../shared/assets/icons/store/phone.svg";
import { ReactComponent as LocationIcon } from "../../shared/assets/icons/store/location.svg";
import { ReactComponent as FacebookIcon } from "../../shared/assets/icons/store/facebook.svg";
import { ReactComponent as XIcon } from "../../shared/assets/icons/store/x.svg";
import { ReactComponent as YoutubeIcon } from "../../shared/assets/icons/store/youtube.svg";
import { ReactComponent as InstagramIcon } from "../../shared/assets/icons/store/instagram.svg";
import Button from "@src/modules/shared/components/Button/Button";
import { useAppDispatch, useAppSelector } from "@src/modules/shared/store";
import { setProducts } from "../data/productSlice";
import { useParams } from "react-router-dom";
import { BASE_URL } from "@src/modules/auth/data/authThunk";
import { ProductType } from "../data/dataTypes";
import Product from "../home/components/Product/Product";
import { Pagination } from "antd";
import { Empty } from "antd";
function StoreDetails() {
  const dispatch = useAppDispatch();
  const { storeId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const perPage = 3;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
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
    products: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/stores/${storeId}`);
        const data = await response.json();

        setStore(data?.data);
      } catch (err: string | unknown) {
        console.error(err);
        return err;
      }
    };

    fetchData();
  }, [BASE_URL]);

  const fetchData = async (page: number, perPage: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}api/stores/${storeId}/products?isPublished=true&perPage=${perPage}&page=${page}`
      );

      const data = await response.json();
      setTotalRecords(data.data.meta.totalRecords);

      dispatch(
        setProducts(
          data?.data?.docs.map((product: ProductType) => {
            return { ...product, quantity: 0 };
          })
        )
      );
    } catch (err: string | unknown) {
      console.error(err);
      return err;
    }
  };

  useEffect(() => {
    fetchData(currentPage, perPage);
  }, [currentPage]);

  const theProducts = useAppSelector((state) => state?.product?.products);
  const cart = useAppSelector((state) => state?.cart?.cart);
  const updatedProducts = theProducts.map((product: any) => {
    const updatedProduct = cart.find(
      (item) => item?.product?.id === product?.id
    );
    if (updatedProduct) {
      return { ...product, quantity: updatedProduct.quantity };
    } else return product;
  });

  return (
    <div className="home">
      <div className="store-card-identification">
        <div className="background-image"></div>
        <div className="photo-and-info">
          <div className="store-profile-photo-wrapper">
            <img
              className="store-profile-photo"
              src={store?.logo}
              height={110}
              width={110}
              alt=""
            />
          </div>
          <div className="store-info">
            <div className="store-name-and-media">
              <h2 className="store-name">{store?.name}</h2>
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
                  <p className="location">{store?.address}</p>
                </div>
                <div className="store-location">
                  <PhoneIcon className="phoneIcon" />{' '}
                  <p className="location">(+216) {store?.phoneNumber}</p>
                </div>
              </div>
              <div className="contact-button">
                <Button label={'Contact Vendor'} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {updatedProducts.length === 0 ? (
        <Empty description={<span>This store is empty</span>} />
      ) : (
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 0 36px 24px"

        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "auto",
            gridGap: "1rem",
          }}
        >
            {updatedProducts.map(
              (
                {
                  availability,
                  id,
                  name,
                  images,
                  price,
                  stockNumber,
                  quantity,
                },
                index
              ) => (
                <Product
                  availability={availability}
                  id={id}
                  key={index}
                  name={name}
                  price={Number(price)}
                  images={images}
                  stockNumber={stockNumber}
                  quantity={quantity}
                />
              )
            )}
          </div>
          <Pagination
            current={currentPage}
            total={totalRecords}
            pageSize={perPage}
            onChange={handlePageChange}
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default StoreDetails;
