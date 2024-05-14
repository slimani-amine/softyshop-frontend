import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import { agreeToAllFees, hideIt } from '../../data/addressSlice';
import Button from '@src/modules/shared/components/Button/Button';

function DifferentStoresModal({ storesNumber }: { storesNumber: number }) {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.address.isPopUpShown);

  const handleOk = async function () {
    Promise.all([await dispatch(agreeToAllFees()), dispatch(hideIt())]);
  };

  const handleCancel = () => {
    dispatch(hideIt());
  };

  return (
    <div className="diff-stores-modal">
      <Modal
        title="You ordered from DIFFERENT stores!"
        centered={true}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="modal-save-button">
            <Button
              size="sm"
              label="I Agree"
              type="submit"
              onClick={() => handleOk()}
            />
          </div>,
        ]}
      >
        <p className="warning-text">
          By clicking this button you agree to pay the {storesNumber} different
          deliveries that will be needed to make this order.
        </p>
      </Modal>
    </div>
  );
}

export default DifferentStoresModal;
