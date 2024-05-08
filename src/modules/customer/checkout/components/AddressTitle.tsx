import { ReactComponent as EditAddress } from '../../../shared/assets/icons/checkout/editAddress.svg';
import { ReactComponent as DeleteAddress } from '../../../shared/assets/icons/checkout/deleteAddress.svg';

function AddressTitle({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="address-title-bar">
      <p>{children}</p>
      <div className="icons">
        <div className="icon">
          <EditAddress />
        </div>
        <div className="icon" onClick={() => console.log(id)}>
          <DeleteAddress />
        </div>
      </div>
    </div>
  );
}

export default AddressTitle;
