import CheckedItem from '@src/modules/shared/components/customer/customerSidebar/components/CheckedItem';
import Number from './components/Number';
import Section from './components/Section';
import Title from './components/Title';
import Button from '@src/modules/shared/components/Button/Button';
import Address from './components/Address';
import AddressTitle from './components/AddressTitle';
import AddressContent from './components/AddressContent';
import CheckoutSelect from './components/CheckoutSelect';
import AddAddressModal from './components/AddAddressModal';

import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import { getAddresses } from '../data/addressThunk';
import { useEffect } from 'react';
import { addressType } from '../data/dataTypes';

function Checkout() {
  const dispatch = useAppDispatch();
  const deliveryDate = useAppSelector((state) => state.checkout.deliveryDate);
  const deliveryTime = useAppSelector((state) => state.checkout.deliveryTime);
  const userId = useAppSelector((state) => state?.auth?.user?.id);
  const isChecked = useAppSelector((state) => state.checkout.agreedToPayCash);
  const cart = useAppSelector((state) => state.cart.cart);
  const total = useAppSelector((state) => state.cart.cartAmount);
  const Total = total + 28;
  const isOrderReady = isChecked && deliveryDate && deliveryTime;

  useEffect(() => {
    function getAllAddresses() {
      dispatch(getAddresses(userId));
    }
    getAllAddresses();
  }, [userId, dispatch, getAddresses]);

  const addresses: addressType[] = useAppSelector(
    (state) => state?.address?.address?.sort((a: any, b: any) => b - a)
  );

  // const [chosenAddress, setChosenAddress] = useState(null);

  return (
    <div className="checkout-page">
      <div className="checkout" style={{ padding: '0 24px' }}>
        <Section>
          <div className="checkout-title-bar">
            <Number>1</Number>
            <Title>delivery date & time</Title>
          </div>
          <div className="date-section">
            <CheckoutSelect></CheckoutSelect>
          </div>
        </Section>
        <Section>
          <div className="checkout-title-bar-and-button">
            <div className="checkout-title-bar">
              <Number>2</Number> <Title>delivery address</Title>
            </div>
            <AddAddressModal />
          </div>
          <div className="section-content addresses-section">
            {/*   eslint-disable-next-line */}
            {addresses?.map(
              ({ state, address, city, zipCode, phoneNumber, id }, index) => {
                return (
                  <div
                    key={index}
                    className="checkout-address checkout-address1"
                  >
                    <Address>
                      <AddressTitle id={id.toString()}>{state}</AddressTitle>
                      <AddressContent>
                        {address} <br /> {city}, {zipCode}
                        <br />
                        {phoneNumber}
                      </AddressContent>
                    </Address>
                  </div>
                );
              }
            )}
          </div>
        </Section>
        <Section>
          <div className="checkout-title-bar">
            <Number>3</Number> <Title>payment details</Title>
          </div>
          <div className="payment-method">
            <CheckedItem>
              <p className="payment-method-text">
                I agree to pay cash on delivery
              </p>
            </CheckedItem>
          </div>
          {isOrderReady ? (
            <Button label="Place Order" size="xl" style={{ width: '100%' }} />
          ) : (
            <Button
              label="Place Order"
              size="xl"
              variant="secondary"
              disabled={true}
              style={{ width: '100%' }}
            />
          )}
        </Section>
      </div>
      <div className="order">
        <h3 className="order-title">Your order</h3>
        <section className="cart-items">
          {cart.map((item, index) => {
            if (!item?.product) return;
            return (
              <div className="checkout-order-item" key={index}>
                <p className="checkout-order-details">
                  <strong className="order-quantity">{item.quantity}</strong> x{' '}
                  {item?.product?.name}
                </p>
                <p className="checkout-order-item-price">
                  ${(item?.product?.price * item?.quantity).toFixed(2)}
                </p>
              </div>
            );
          })}
        </section>
        <section className="calcul">
          <div className="line">
            <p className="label">subtotal:</p>
            <p className="cost">${total.toFixed(2)}</p>
          </div>
          <div className="line">
            <p className="label">shipping:</p>
            <p className="cost">$8.00</p>
          </div>
          <div className="line">
            <p className="label">tax:</p>
            <p className="cost">$20.00</p>
          </div>
          <div className="line">
            <p className="label">discount:</p>
            <p className="cost">-</p>
          </div>
        </section>
        <section className="total">
          <div className="line">
            <p className="label">total:</p>
            <p className="cost">${Total.toFixed(2)}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Checkout;
