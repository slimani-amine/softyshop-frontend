import { ReactComponent as EditAddress } from '../../../shared/assets/icons/checkout/editAddress.svg';
import { ReactComponent as DeleteAddress } from '../../../shared/assets/icons/checkout/deleteAddress.svg';

function AddressTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="address-title-bar">
      <p>{children}</p>
      <div className="icons">
        <div className="icon icon1">
          <EditAddress />
        </div>
        <div className="icon icon2">
          <DeleteAddress />
        </div>
      </div>
    </div>
  );
}

export default AddressTitle;
