import { ReactComponent as EditAddress } from '../../../shared/assets/icons/checkout/editAddress.svg';
import { ReactComponent as DeleteAddress } from '../../../shared/assets/icons/checkout/deleteAddress.svg';
import { deleteAddress, getAddresses } from '../../data/addressThunk';
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import toast from 'react-hot-toast';

function AddressTitle({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state?.auth?.user?.id);
  async function handleDelete(id: number) {
    Promise.all([
      await dispatch(deleteAddress(id)),
      toast.success('Address deleted successfully'),
      dispatch(getAddresses(userId)),
    ]);
  }
  return (
    <div className="address-title-bar">
      <p>{children}</p>
      <div className="icons">
        <div className="icon">
          <EditAddress />
        </div>
        <div className="delete-icon" onClick={() => handleDelete(+id)}>
          <DeleteAddress />
        </div>
      </div>
    </div>
  );
}

export default AddressTitle;
