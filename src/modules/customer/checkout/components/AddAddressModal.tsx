import Input from '@src/modules/shared/components/Input/Input';
import Button from '@src/modules/shared/components/Button/Button';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Modal } from 'antd';
import { getChangedValues } from '@src/modules/shared/utils/getChangedValuesFormik';
import { useAppSelector } from '@src/modules/shared/store';

const AddAddressModal: React.FC = () => {
  // const dispatch = useDispatch();
  const userId: string | undefined = useAppSelector(
    (state) => state.auth.user?.id
  );

  console.log('🚀 ~ Header ~ userId:', userId);

  const initialValues = {
    address: '',
    phoneNumber: '',
    city: '',
    state: '',
    zipCode: '',
  };
  // const [submitting, setSubmitting] = useState(false);
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
      phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^([9527]\d{7})$/g, 'Invalid phone number'),
      city: Yup.string().required('The City is required'),
      state: Yup.string().required('The State is required'),
      zipCode: Yup.string().required('Zip Code is required'),
    }),
    onSubmit: (values) => {
      // setSubmitting(true);
      const changedValues = getChangedValues(values, initialValues);
      console.log(changedValues);
      return handleOk();
    },
  });

  console.log(formik);
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
        footer={[
          <form onSubmit={formik.handleSubmit}>
            <Button size="sm" label="Save" type="submit" />
          </form>,
        ]}
      >
        <div className="add-address-inputs">
          <Input
            size="sm"
            name="address"
            formik={formik}
            variant="secondary"
            placeholder="Enter your address"
            label="Address"
            required={true}
          />
          <Input
            size="sm"
            name="phoneNumber"
            formik={formik}
            variant="secondary"
            placeholder="Enter your phone number"
            label="Phone Number"
            required={true}
          />
          <Input
            size="sm"
            name="city"
            formik={formik}
            variant="secondary"
            placeholder="Enter your city"
            label="City"
            required={true}
          />
          <Input
            size="sm"
            name="state"
            formik={formik}
            variant="secondary"
            placeholder="Enter your state"
            label="State"
            required={true}
          />
          <Input
            size="sm"
            name="zipCode"
            formik={formik}
            variant="secondary"
            placeholder="Enter your zip code"
            label="Zip Code"
            required={true}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddAddressModal;
