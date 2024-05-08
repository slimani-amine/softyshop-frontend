import { useAppDispatch } from '@src/modules/shared/store';
import { updateSelectedId } from '../../data/addressSlice';

function Address({ id, children }: { id: number; children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  function handleSelect(ID: number) {
    dispatch(updateSelectedId(ID));
  }
  return (
    <div onClick={() => handleSelect(id)} className="address">
      {children}
    </div>
  );
}

export default Address;
