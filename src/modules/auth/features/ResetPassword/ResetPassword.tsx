import Button from '@src/modules/shared/components/Button/Button';
import {
  // useLocation,
  useNavigate,
} from 'react-router-dom';
// import { PATH } from '@src/modules/auth/routes/paths';
// import { useDispatch, useSelector } from 'react-redux';
// import { initialStateType, setRole } from '../../data/roleSlice';
// import { useEffect } from 'react';
import { useAppSelector } from '@src/modules/shared/store';
import Input from '@src/modules/shared/components/Input/Input';
import { useFormik } from 'formik';
import { useState } from 'react';

const initialValues = {
  email: '',
};
function ResetPassword() {
  // const navigate = useNavigate();
  // const { pathname } = useLocation();
  const [submitting, setSubmitting] = useState(false);

  // const formik = useFormik({
  //   initialValues,
  //   validationSchema: Yup.object().shape({
  //     email: Yup.string().required('Email is required'),
  //   }),
  //   // onSubmit: (values) => {
  //   //   setSubmitting(true);
  //   //   const changedValues = getChangedValues(values, initialValues);
  //   //   dispatch(login(changedValues))
  //   //     .unwrap()
  //   //     .then(() => {
  //   //       toast.success('Welcome to SoftyShop!');
  //   //       navigate('/home');
  //   //     })
  //   //     .catch((err) => {
  //   //       toast.error(err?.message || 'something-went-wrong');
  //   //     })
  //   //     .finally(() => {
  //   //       setSubmitting(false);
  //   //     });
  //   // },
  // });

  // const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  // console.log(isAuthenticated);

  return (
    <div className="reset-module">
      <div className="reset-card-container">
        <h1 className="reset-title">Reset Password</h1>
        <h1 className="reset-text">
          Forgot your password? Don't worry! Please hand us your email and we
          will reset it for you.
        </h1>
        <form>
          {/* <Input
            defaultValue="fadi@benromdhan.com"
            name="email"
            formik={useFormik}
            variant="secondary"
            placeholder="Enter your email"
            label="Email"
            required={true}
          /> */}
          <Button label={'Continue'} />
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
