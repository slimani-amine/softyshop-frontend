import { ReactComponent as EditAddress } from '../../../shared/assets/icons/checkout/editAddress.svg';
import { ReactComponent as DeleteAddress } from '../../../shared/assets/icons/checkout/deleteAddress.svg';

function AddressTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="address-title-bar">
      <p>{children}</p>
      <div className="icons">
        <EditAddress />
        <DeleteAddress />
      </div>
    </div>
  );
}

export default AddressTitle;
