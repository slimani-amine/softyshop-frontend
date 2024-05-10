import { useAppDispatch, useAppSelector } from "@src/modules/shared/store";
import { updateSelectedId } from "../../data/addressSlice";

function Address({ id, children }: { id: number; children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  function handleSelect(ID: number) {
    dispatch(updateSelectedId(ID));
  }
  const selectedId = useAppSelector((state) => state.address.selectedAddress);
  return (
    <>
      {selectedId == id ? (
        <div
          style={{ border: "1px solid #D23E57" }}
          onClick={() => handleSelect(id)}
          className="address"
        >
          {children}
        </div>
      ) : (
        <div onClick={() => handleSelect(id)} className="address">
          {children}
        </div>
      )}
    </>
  );
}

export default Address;
