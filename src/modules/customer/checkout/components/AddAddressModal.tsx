import Button from '@src/modules/shared/components/Button/Button';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Modal } from 'antd';
import { getChangedValues } from '@src/modules/shared/utils/getChangedValuesFormik';

const AddAddressModal: React.FC = () => {
  const initialValues = {
    address: '',
    phoneNumber: '',
    city: '',
    state: '',
    zipCode: '',
  };
  const [submitting, setSubmitting] = useState(false);
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

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      address: Yup.string().required('Address is required'),
      phoneNumber: Yup.string().required('Phone number is required'),
      city: Yup.string().required('The City is required'),
      state: Yup.string().required('The State is required'),
      zipCode: Yup.string().required('Zip Code is required'),
    }),
    onSubmit: (values) => {
      setSubmitting(true);
      const changedValues = getChangedValues(values, initialValues);
    },
  });

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
