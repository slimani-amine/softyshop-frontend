import { Avatar, Button, Empty, Pagination } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Section from "../../checkout/components/Section";
import Number from "../../checkout/components/Number";
import Title from "../../checkout/components/Title";
import AddAddressModal from "../../checkout/components/AddAddressModal";
import { addressType, orderType } from "../../data/dataTypes";
import { useAppDispatch, useAppSelector } from "@src/modules/shared/store";
import Address from "../../checkout/components/Address";
import AddressTitle from "../../checkout/components/AddressTitle";
import AddressContent from "../../checkout/components/AddressContent";
import { useEffect, useState } from "react";
import { getAddresses } from "../../data/addressThunk";
import { getOrders } from "../../data/orderThunk";
import convertDate from "@src/modules/shared/utils/convertTime";

function MyProfile() {
  const navigate = useNavigate();
  const current_user = useSelector((state: any) => state.auth.user);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3);
  useEffect(() => {
    function getAllAddresses() {
      dispatch(getAddresses(current_user.id));
    }
    function getMyOrders() {
      dispatch(getOrders({ page: currentPage, pageSize }));
    }
    getAllAddresses();
    getMyOrders();
  }, [current_user, dispatch, getAddresses, getOrders]);

  const addresses: addressType[] = useAppSelector(
    (state) => state?.address?.address
  );

  const { orders, totalRecords } = useAppSelector(
    (state) => state?.order.myOrders
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const displayedOrders = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="card">
      <div className="card__img">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%">
          <rect fill="#ffffff" width="540" height="450"></rect>
          <defs>
            <linearGradient
              id="a"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1="0"
              y2="100%"
              gradientTransform="rotate(222,648,379)"
            >
              <stop offset="0" stopColor="#ffffff"></stop>
              <stop offset="1" stopColor="#FC726E"></stop>
            </linearGradient>
            <pattern
              patternUnits="userSpaceOnUse"
              id="b"
              width="300"
              height="250"
              x="0"
              y="0"
              viewBox="0 0 1080 900"
            >
              <g fillOpacity="0.5">
                <polygon fill="#444" points="90 150 0 300 180 300"></polygon>
                <polygon points="90 150 180 0 0 0"></polygon>
                <polygon fill="#AAA" points="270 150 360 0 180 0"></polygon>
                <polygon fill="#DDD" points="450 150 360 300 540 300"></polygon>
                <polygon fill="#999" points="450 150 540 0 360 0"></polygon>
                <polygon points="630 150 540 300 720 300"></polygon>
                <polygon fill="#DDD" points="630 150 720 0 540 0"></polygon>
                <polygon fill="#444" points="810 150 720 300 900 300"></polygon>
                <polygon fill="#FFF" points="810 150 900 0 720 0"></polygon>
                <polygon
                  fill="#DDD"
                  points="990 150 900 300 1080 300"
                ></polygon>
                <polygon fill="#444" points="990 150 1080 0 900 0"></polygon>
                <polygon fill="#DDD" points="90 450 0 600 180 600"></polygon>
                <polygon points="90 450 180 300 0 300"></polygon>
                <polygon fill="#666" points="270 450 180 600 360 600"></polygon>
                <polygon fill="#AAA" points="270 450 360 300 180 300"></polygon>
                <polygon fill="#DDD" points="450 450 360 600 540 600"></polygon>
                <polygon fill="#999" points="450 450 540 300 360 300"></polygon>
                <polygon fill="#999" points="630 450 540 600 720 600"></polygon>
                <polygon fill="#FFF" points="630 450 720 300 540 300"></polygon>
                <polygon points="810 450 720 600 900 600"></polygon>
                <polygon fill="#DDD" points="810 450 900 300 720 300"></polygon>
                <polygon
                  fill="#AAA"
                  points="990 450 900 600 1080 600"
                ></polygon>
                <polygon
                  fill="#444"
                  points="990 450 1080 300 900 300"
                ></polygon>
                <polygon fill="#222" points="90 750 0 900 180 900"></polygon>
                <polygon points="270 750 180 900 360 900"></polygon>
                <polygon fill="#DDD" points="270 750 360 600 180 600"></polygon>
                <polygon points="450 750 540 600 360 600"></polygon>
                <polygon points="630 750 540 900 720 900"></polygon>
                <polygon fill="#444" points="630 750 720 600 540 600"></polygon>
                <polygon fill="#AAA" points="810 750 720 900 900 900"></polygon>
                <polygon fill="#666" points="810 750 900 600 720 600"></polygon>
                <polygon
                  fill="#999"
                  points="990 750 900 900 1080 900"
                ></polygon>
                <polygon fill="#999" points="180 0 90 150 270 150"></polygon>
                <polygon fill="#444" points="360 0 270 150 450 150"></polygon>
                <polygon fill="#FFF" points="540 0 450 150 630 150"></polygon>
                <polygon points="900 0 810 150 990 150"></polygon>
                <polygon fill="#222" points="0 300 -90 450 90 450"></polygon>
                <polygon fill="#FFF" points="0 300 90 150 -90 150"></polygon>
                <polygon fill="#FFF" points="180 300 90 450 270 450"></polygon>
                <polygon fill="#666" points="180 300 270 150 90 150"></polygon>
                <polygon fill="#222" points="360 300 270 450 450 450"></polygon>
                <polygon fill="#FFF" points="360 300 450 150 270 150"></polygon>
                <polygon fill="#444" points="540 300 450 450 630 450"></polygon>
                <polygon fill="#222" points="540 300 630 150 450 150"></polygon>
                <polygon fill="#AAA" points="720 300 630 450 810 450"></polygon>
                <polygon fill="#666" points="720 300 810 150 630 150"></polygon>
                <polygon fill="#FFF" points="900 300 810 450 990 450"></polygon>
                <polygon fill="#999" points="900 300 990 150 810 150"></polygon>
                <polygon points="0 600 -90 750 90 750"></polygon>
                <polygon fill="#666" points="0 600 90 450 -90 450"></polygon>
                <polygon fill="#AAA" points="180 600 90 750 270 750"></polygon>
                <polygon fill="#444" points="180 600 270 450 90 450"></polygon>
                <polygon fill="#444" points="360 600 270 750 450 750"></polygon>
                <polygon fill="#999" points="360 600 450 450 270 450"></polygon>
                <polygon fill="#666" points="540 600 630 450 450 450"></polygon>
                <polygon fill="#222" points="720 600 630 750 810 750"></polygon>
                <polygon fill="#FFF" points="900 600 810 750 990 750"></polygon>
                <polygon fill="#222" points="900 600 990 450 810 450"></polygon>
                <polygon fill="#DDD" points="0 900 90 750 -90 750"></polygon>
                <polygon fill="#444" points="180 900 270 750 90 750"></polygon>
                <polygon fill="#FFF" points="360 900 450 750 270 750"></polygon>
                <polygon fill="#AAA" points="540 900 630 750 450 750"></polygon>
                <polygon fill="#FFF" points="720 900 810 750 630 750"></polygon>
                <polygon fill="#222" points="900 900 990 750 810 750"></polygon>
                <polygon
                  fill="#222"
                  points="1080 300 990 450 1170 450"
                ></polygon>
                <polygon
                  fill="#FFF"
                  points="1080 300 1170 150 990 150"
                ></polygon>
                <polygon points="1080 600 990 750 1170 750"></polygon>
                <polygon
                  fill="#666"
                  points="1080 600 1170 450 990 450"
                ></polygon>
                <polygon
                  fill="#DDD"
                  points="1080 900 1170 750 990 750"
                ></polygon>
              </g>
            </pattern>
          </defs>
          <rect x="0" y="0" fill="url(#a)" width="100%" height="100%"></rect>
          <rect x="0" y="0" fill="url(#b)" width="100%" height="100%"></rect>
        </svg>
      </div>
      <Avatar
        size={200}
        className="avatar"
        src={current_user?.picture}
        alt="User picture"
      />
      <div className="description">
        <div className="card__title">
          {current_user?.firstName} {current_user?.lastName}
        </div>
        <div className="card__wrapper">
          <Button
            className="card__btn"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            My workspace
          </Button>
        </div>
      </div>
      <Section>
        <div className="checkout-title-bar-and-button">
          <div className="checkout-title-bar">
            <Number> </Number> <Title>My addresses</Title>
          </div>
          <AddAddressModal />
        </div>
        <div
          className="section-content addresses-section"
          style={{
            justifyContent: addresses.length === 0 ? "center" : "flex-start",
          }}
        >
          {addresses.length === 0 ? (
            <Empty description={<span>You don't have addresses </span>} />
          ) : (
            addresses.map((address, index) => {
              const {
                state,
                address: streetAddress,
                city,
                zipCode,
                phoneNumber,
                id,
              } = address;
              return (
                <div key={index} className="checkout-address">
                  <Address id={id}>
                    <AddressTitle id={id.toString()}>{state}</AddressTitle>
                    <AddressContent>
                      {streetAddress} <br /> {city}, {zipCode}
                      <br />
                      {phoneNumber}
                    </AddressContent>
                  </Address>
                </div>
              );
            })
          )}
        </div>
      </Section>
      <Section>
        <div className="checkout-title-bar-and-button">
          <div className="checkout-title-bar">
            <Number> </Number> <Title>My Orders</Title>
          </div>
        </div>
        <div className="section-content orders-section">
          {orders.length === 0 ? (
            <Empty description={<span>You don't have any orders.</span>} />
          ) : (
            displayedOrders.map((order: orderType) => (
              <div key={order.id} className="order-card">
                {/* Example image, adjust based on your data */}
                <div className="order-details">
                  <div className="order-info">
                    <p className="order-id">#{order.id}</p>
                    <p className={`order-status status-${order.status}`}>
                      {order.status}
                    </p>
                  </div>
                  <p className="order-date">{convertDate(order.createdAt)}</p>
                  <div className="order-cart">
                    <p>{order.cart.totalQuantity} Product(s)</p>
                    <p>Total ${order.cart.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {totalRecords > pageSize && (
          <Pagination
            className="pagination"
            current={currentPage}
            pageSize={pageSize}
            total={totalRecords}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        )}
      </Section>
    </div>
  );
}

export default MyProfile;
