import Button from '@src/modules/shared/components/Button/Button';
// import {
//   useLocation,
//   useNavigate,
// } from 'react-router-dom';
// import { PATH } from '@src/modules/auth/routes/paths';
// import { useDispatch, useSelector } from 'react-redux';
// import { initialStateType, setRole } from '../../data/roleSlice';
// import { useEffect } from 'react';
import { useAppDispatch } from '@src/modules/shared/store';
import Input from '@src/modules/shared/components/Input/Input';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { getChangedValues } from '@src/modules/shared/utils/getChangedValuesFormik';
import { resetPassword } from '../../data/authThunk';
import toast from 'react-hot-toast';

const initialValues = {
  email: '',
};
function ResetPassword() {
  // const navigate = useNavigate();
  // const { pathname } = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Email is required'),
    }),
    onSubmit: (values) => {
      // console.log('hola');
      setSubmitting(true);
      const changedValues = getChangedValues(values, initialValues);
      dispatch(resetPassword(changedValues))
        .unwrap()
        .then(() => {
          toast.success('Email sent!');
        })
        .catch((err: any) => {
          toast.error(err?.message || 'something-went-wrong');
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  // const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  // console.log(isAuthenticated);
  // console.log(formik);
  return (
    <div className="reset-module">
      <div className="reset-card-container">
        <h1 className="reset-title">Reset Password</h1>
        <h1 className="reset-text">
          Forgot your password? Don't worry! Please hand us your email and we
          will reset it for you.
        </h1>
        <form className="reset-form" onSubmit={formik.handleSubmit}>
          <Input
            defaultValue="fadi@benromdhan.com"
            name="email"
            formik={formik}
            variant="secondary"
            placeholder="Enter your email"
            label="Email"
            required={true}
          />
          <Button label={'Continue'} type={'submit'} loading={submitting} />
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
