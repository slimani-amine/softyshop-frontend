import CheckedItem from '@src/modules/shared/components/customer/customerSidebar/components/CheckedItem';
import Number from './components/Number';
import Section from './components/Section';
import Title from './components/Title';
import Button from '@src/modules/shared/components/Button/Button';
import Address from './components/Address';
import AddressTitle from './components/AddressTitle';
import AddressContent from './components/AddressContent';
import { useAppSelector } from '@src/modules/shared/store';
import CheckoutSelect from './components/CheckoutSelect';

function Checkout() {
  const deliveryDate = useAppSelector((state) => state.checkout.deliveryDate);
  const deliveryTime = useAppSelector((state) => state.checkout.deliveryTime);
  const isChecked = useAppSelector((state) => state.checkout.agreedToPayCash);
  const cart = useAppSelector((state) => state.cart.cart);
  const total = useAppSelector((state) => state.cart.cartAmount);
  const Total = total + 28;

  const isOrderReady = isChecked && deliveryDate && deliveryTime;

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
            <Button
              size="sm"
              outlined={true}
              label="Add New Address"
              style={{ height: '36px', width: '150px' }}
            />
          </div>
          <div className="section-content addresses-section">
            <Address>
              <AddressTitle>Home</AddressTitle>
              <AddressContent>
                645 Bondorbazaar, MA 2351 968 Brockton, MA 2351 +18334271710
              </AddressContent>
            </Address>
            <Address>
              <AddressTitle>Office</AddressTitle>
              <AddressContent>
                645 Bondorbazaar, MA 2351 968 Brockton, MA 2351 +18334271710
              </AddressContent>
            </Address>
            <Address>
              <AddressTitle>Apartment</AddressTitle>
              <AddressContent>
                645 Bondorbazaar, MA 2351 968 Brockton, MA 2351 +18334271710
              </AddressContent>
            </Address>
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
          {cart.map((item, index) => (
            <div className="checkout-order-item" key={index}>
              <p className="checkout-order-details">
                <strong className="order-quantity">{item.quantity}</strong> x{' '}
                {item?.product?.name}
              </p>
              <p className="checkout-order-item-price">
                ${(item?.product?.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
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