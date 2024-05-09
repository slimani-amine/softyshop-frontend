import React from 'react';
import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import { hideIt } from '../../data/addressSlice';

const DifferentStoresModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.address.isPopUpShown);

  const handleOk = () => {
    dispatch(hideIt());
  };

  const handleCancel = () => {
    dispatch(hideIt());
  };

  return (
    <div className="diff-stores-modal">
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default DifferentStoresModal;
