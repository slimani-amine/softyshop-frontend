import CheckedItem from '@src/modules/shared/components/customer/customerSidebar/components/CheckedItem';
import Number from './components/Number';
import Section from './components/Section';
import Title from './components/Title';
import Button from '@src/modules/shared/components/Button/Button';
import Address from './components/Address';

function Checkout() {
  return (
    <div className="checkout" style={{ padding: '0 24px' }}>
      <Section>
        <div className="checkout-title-bar">
          <Number>1</Number> <Title>delivery date & time</Title>
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
        <div className="section-content">
          <Address></Address>
          <Address></Address>
          <Address></Address>
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
        <Button label="Place Order" size="xl" style={{ width: '100%' }} />
      </Section>
    </div>
  );
}

export default Checkout;
