import Button from '@src/modules/shared/components/Button/Button';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Modal } from 'antd';

const AddAddressModal: React.FC = () => {
  const initialValues = {
    address: '',
    phoneNumber: '',
    city: '',
    state: '',
    zipCode: '',
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        size="sm"
        outlined={true}
        label="Add New Address"
        style={{ height: '36px', width: '150px' }}
        onClick={showModal}
      />
      <Modal
        centered={true}
        title="Add New Address Information"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[<Button size="sm" label="Save" onClick={handleOk} />]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default AddAddressModal;
